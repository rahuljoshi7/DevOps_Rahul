const productModel = require("../models/products");
const fs = require("fs");
const path = require("path");

class Product {
  static deleteImages(images, mode) {
    const basePath = path.join(__dirname, "../public/uploads/products/");
    for (let i = 0; i < images.length; i++) {
      const filePath =
        mode === "file"
          ? basePath + images[i].filename
          : basePath + images[i];
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
    }
  }

  async getAllProduct(req, res) {
    try {
      const Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      return res.json({ Products });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async postAddProduct(req, res) {
    let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } =
      req.body;
    const images = req.files;

    if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pOffer || !pStatus) {
      Product.deleteImages(images, "file");
      return res.json({ error: "All fields are required" });
    } else if (pName.length > 255 || pDescription.length > 3000) {
      Product.deleteImages(images, "file");
      return res.json({ error: "Name must be under 255 and description under 3000 characters" });
    } else if (images.length !== 2) {
      Product.deleteImages(images, "file");
      return res.json({ error: "Please provide exactly 2 images" });
    } else {
      try {
        const allImages = images.map((img) => img.filename);
        const newProduct = new productModel({
          pImages: allImages,
          pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus,
        });
        const save = await newProduct.save();
        if (save) return res.json({ success: "Product created successfully" });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }
  }

  async postEditProduct(req, res) {
    let { pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, pImages } = req.body;
    const editImages = req.files;

    if (!pId || !pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pOffer || !pStatus) {
      return res.json({ error: "All fields are required" });
    } else if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({ error: "Name must be under 255 and description under 3000 characters" });
    } else if (editImages && editImages.length === 1) {
      Product.deleteImages(editImages, "file");
      return res.json({ error: "Please provide exactly 2 images" });
    } else {
      let editData = { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus };
      if (editImages.length === 2) {
        editData.pImages = editImages.map((img) => img.filename);
        Product.deleteImages(pImages.split(","), "string");
      }
      try {
        await productModel.findByIdAndUpdate(pId, editData);
        return res.json({ success: "Product updated successfully" });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }
  }

  async getDeleteProduct(req, res) {
    const { pId } = req.body;
    if (!pId) return res.json({ error: "All fields are required" });
    try {
      const deleteProductObj = await productModel.findById(pId);
      const deleteProduct = await productModel.findByIdAndDelete(pId);
      if (deleteProduct) {
        Product.deleteImages(deleteProductObj.pImages, "string");
        return res.json({ success: "Product deleted successfully" });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getSingleProduct(req, res) {
    const { pId } = req.body;
    if (!pId) return res.json({ error: "All fields are required" });
    try {
      const singleProduct = await productModel
        .findById(pId)
        .populate("pCategory", "cName")
        .populate("pRatingsReviews.user", "name email userImage");
      if (singleProduct) return res.json({ Product: singleProduct });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getProductByCategory(req, res) {
    const { catId } = req.body;
    if (!catId) return res.json({ error: "All fields are required" });
    try {
      const products = await productModel
        .find({ pCategory: catId })
        .populate("pCategory", "cName");
      return res.json({ Products: products });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getProductByPrice(req, res) {
    const { price } = req.body;
    if (!price) return res.json({ error: "All fields are required" });
    try {
      const products = await productModel
        .find({ pPrice: { $lt: price } })
        .populate("pCategory", "cName")
        .sort({ pPrice: -1 });
      return res.json({ Products: products });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getWishProduct(req, res) {
    const { productArray } = req.body;
    if (!productArray) return res.json({ error: "All fields are required" });
    try {
      const wishProducts = await productModel.find({ _id: { $in: productArray } });
      return res.json({ Products: wishProducts });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getCartProduct(req, res) {
    const { productArray } = req.body;
    if (!productArray) return res.json({ error: "All fields are required" });
    try {
      const cartProducts = await productModel.find({ _id: { $in: productArray } });
      return res.json({ Products: cartProducts });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async postAddReview(req, res) {
    const { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All fields are required" });
    }
    try {
      const product = await productModel.findById(pId);
      const alreadyReviewed = product.pRatingsReviews.some(
        (item) => item.user.toString() === uId
      );
      if (alreadyReviewed) {
        return res.json({ error: "You have already reviewed this product" });
      }
      await productModel.findByIdAndUpdate(pId, {
        $push: { pRatingsReviews: { review, user: uId, rating } },
      });
      return res.json({ success: "Thanks for your review" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async deleteReview(req, res) {
    const { rId, pId } = req.body;
    if (!rId) return res.json({ error: "All fields are required" });
    try {
      await productModel.findByIdAndUpdate(pId, {
        $pull: { pRatingsReviews: { _id: rId } },
      });
      return res.json({ success: "Your review has been deleted" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

const productController = new Product();
module.exports = productController;
