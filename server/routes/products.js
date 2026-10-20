import express from 'express';
import { db } from '../services/db.js';

const router = express.Router();

// GET /api/products - List products with rich filtering, search, and sorting
router.get('/', (req, res) => {
  try {
    let products = db.getProducts();
    const { category, search, sort, featured, bestseller } = req.query;

    if (category && category !== 'All') {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q)
      );
    }

    if (featured === 'true') {
      products = products.filter((p) => p.featured);
    }

    if (bestseller === 'true') {
      products = products.filter((p) => p.isBestseller);
    }

    if (sort) {
      if (sort === 'price-low') {
        products = [...products].sort(
          (a, b) => a.packOptions[0].price - b.packOptions[0].price
        );
      } else if (sort === 'price-high') {
        products = [...products].sort(
          (a, b) => b.packOptions[0].price - a.packOptions[0].price
        );
      } else if (sort === 'rating') {
        products = [...products].sort((a, b) => b.rating - a.rating);
      } else if (sort === 'name') {
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/categories - Distinct categories with counts
router.get('/categories', (req, res) => {
  try {
    const products = db.getProducts();
    const categoryCounts = { All: products.length };

    products.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts).map((cat) => ({
      name: cat,
      count: categoryCounts[cat]
    }));

    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:id - Single product with related products & lab info
router.get('/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Get related products from same category
    const related = db
      .getProducts()
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);

    // Get lab report if available
    const labReport = db.getLabReport(product.id);

    res.json({
      success: true,
      data: {
        ...product,
        related,
        hasLabReport: !!labReport
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
