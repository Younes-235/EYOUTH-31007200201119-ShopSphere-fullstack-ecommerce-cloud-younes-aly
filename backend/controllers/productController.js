const prisma = require('../config/db.js');
const supabase = require('../config/supabase.js');
const axios = require('axios');
const logActivity = require('../utils/logger.js');

const REVIEW_SERVICE_URL = process.env.REVIEW_SERVICE_URL || 'http://localhost:5001';

exports.getAllProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sortBy, order, page, limit } = req.query;

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 8;
        const skip = (pageNum - 1) * limitNum;

        const whereClause = {};

        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (category) {
            whereClause.category = category; 
        }

        if (minPrice || maxPrice) {
            whereClause.price = {};
            if (minPrice) whereClause.price.gte = parseFloat(minPrice);
            if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
        }

        const orderBy = {};
        if (sortBy) {
            orderBy[sortBy] = order === 'desc' ? 'desc' : 'asc';
        } else {
            orderBy.createdAt = 'desc';
        }

        const [products, totalCount] = await prisma.$transaction([
            prisma.product.findMany({
                where: whereClause,
                orderBy: orderBy,
                skip: skip,
                take: limitNum,
            }),
            prisma.product.count({ where: whereClause })
        ]);

        res.status(200).json({
            meta: {
                totalCount,
                totalPages: Math.ceil(totalCount / limitNum),
                currentPage: pageNum,
                limit: limitNum
            },
            data: products
        });
    } catch (error) {
        console.error("Error in getProducts:", error);
        res.status(500).json({ error: "Failed to retrieve filtered products" });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const distinctProducts = await prisma.product.findMany({
            select: { category: true },
            distinct: ['category'],
        });

        const cleanCategoriesList = distinctProducts.map(p => p.category);
        
        res.status(200).json(cleanCategoriesList);
    } catch (error) {
        console.error("Error in getCategories:", error);
        res.status(500).json({ error: "Failed to fetch category lists." });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: "Error retrieving product" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imageUrl = null;

        if (req.file) {
            if (supabase) {
                const fileExt = req.file.originalname.split('.').pop();
                const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, req.file.buffer, {
                        contentType: req.file.mimetype,
                    });

                if (uploadError) {
                    console.error("Supabase upload error:", uploadError);
                    return res.status(500).json({ error: "Failed to upload image" });
                }

                const { data: publicUrlData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(fileName);

                imageUrl = publicUrlData?.publicUrl || null;
            } else {
                imageUrl = `https://storage.supabase.co/mock/${req.file.originalname}`;
            }
        }

        const newProduct = await prisma.product.create({
            data: {
                name, 
                description,
                price: parseFloat(price), 
                category,
                stock: parseInt(stock, 10), 
                imageUrl 
            }
        });

        await logActivity({
            action: 'PRODUCT_CREATED',
            user: req.user,
            targetType: 'PRODUCT',
            targetId: newProduct.id,
            details: { name: newProduct.name, price: newProduct.price, category: newProduct.category }
        });
        
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(400).json({ error: "Failed to create product. Check your fields." });
    }
};

exports.updateProductStock = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const { stock } = req.body;

        if (stock === undefined) {
            return res.status(400).json({ error: "Stock value is required field." });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                stock: parseInt(stock, 10)
            }
        });

        await logActivity({
            action: 'PRODUCT_UPDATED',
            user: req.user,
            targetType: 'PRODUCT',
            targetId: productId,
            details: { newStock: updatedProduct.stock }
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error inside updateProductStock handler:", error);
        
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Product record not found in database." });
        }
        
        return res.status(500).json({ error: "Failed to update product stock level." });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = parseInt(req.params.id, 10);

        const targetProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!targetProduct) {
            return res.status(404).json({ error: "Product record not found in database." });
        }

        await prisma.cartItem.deleteMany({ 
            where: { productId: productId } 
        });

        await prisma.orderItem.deleteMany({
            where: { productId: productId }
        });

        try {
            await axios.delete(`${REVIEW_SERVICE_URL}/api/reviews?productId=${productId}`);
        } catch (reviewError) {
            console.error('Failed to delete reviews from microservice:', reviewError.message);
        }

        const deletedProduct = await prisma.product.delete({
            where: { id: productId }
        });

        await logActivity({
            action: 'PRODUCT_DELETED',
            user: req.user,
            targetType: 'PRODUCT',
            targetId: productId,
            details: { name: targetProduct.name }
        });

        return res.status(200).json({ 
            message: "Product, cart entries, order records, and associated reviews deleted successfully.",
            deletedProduct 
        });
    } catch (error) {
        console.error("Error inside deleteProduct handler:", error);
        next(error); 
    }
};