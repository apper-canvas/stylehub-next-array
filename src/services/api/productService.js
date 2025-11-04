import { getApperClient } from "@/services/apperClient";

class ProductService {
  constructor() {
    this.tableName = 'product_c';
  }

  // Get ApperClient instance
  getClient() {
    return getApperClient();
  }

  async getAll() {
    try {
      const apperClient = this.getClient();
      if (!apperClient) throw new Error("ApperClient not available");

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = this.getClient();
      if (!apperClient) throw new Error("ApperClient not available");

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error("Product not found");
      }

      return this.transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  async getByCategory(category) {
    try {
      const apperClient = this.getClient();
      if (!apperClient) throw new Error("ApperClient not available");

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [category],
          "Include": true
        }]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error(`Error fetching products by category ${category}:`, error);
      return [];
    }
  }

  async search(query) {
    try {
      const apperClient = this.getClient();
      if (!apperClient) throw new Error("ApperClient not available");

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "title_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "brand_c", 
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "category_c",
                  "operator": "Contains", 
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "description_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            }
          ]
        }]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error(`Error searching products for ${query}:`, error);
      return [];
    }
  }

  async getFeatured() {
    try {
      const apperClient = this.getClient();
      if (!apperClient) throw new Error("ApperClient not available");

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "rating_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [4.5],
          "Include": true
        }],
        pagingInfo: {
          "limit": 8,
          "offset": 0
        }
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return [];
    }
  }

  async getSaleItems() {
    try {
      const apperClient = this.getClient();
      if (!apperClient) throw new Error("ApperClient not available");

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "discount_c",
          "Operator": "GreaterThan",
          "Values": [0],
          "Include": true
        }]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error fetching sale items:", error);
      return [];
    }
  }

  // Filter methods
  async filterProducts(filters) {
    try {
      const apperClient = this.getClient();
      if (!apperClient) throw new Error("ApperClient not available");

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: []
      };

      // Add filters as needed
      if (filters.category) {
        params.where.push({
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [filters.category],
          "Include": true
        });
      }

      if (filters.priceRange && (filters.priceRange.min || filters.priceRange.max)) {
        if (filters.priceRange.min) {
          params.where.push({
            "FieldName": "price_c",
            "Operator": "GreaterThanOrEqualTo",
            "Values": [filters.priceRange.min],
            "Include": true
          });
        }
        if (filters.priceRange.max) {
          params.where.push({
            "FieldName": "price_c",
            "Operator": "LessThanOrEqualTo",
            "Values": [filters.priceRange.max],
            "Include": true
          });
        }
      }

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data.map(this.transformProduct);
    } catch (error) {
      console.error("Error filtering products:", error);
      return [];
    }
  }

  // Get unique filter values
  async getFilterOptions() {
    try {
      const products = await this.getAll();
      
      const categories = [...new Set(products.map(p => p.category))];
      const brands = [...new Set(products.map(p => p.brand))];
      const sizes = [...new Set(products.flatMap(p => p.sizes || []))];
      const colors = [...new Set(products.flatMap(p => p.colors || []))];

      return {
        categories,
        brands,
        sizes,
        colors
      };
    } catch (error) {
      console.error("Error getting filter options:", error);
      return {
        categories: [],
        brands: [],
        sizes: [],
        colors: []
      };
    }
  }

  // Transform database product to frontend format
  transformProduct(dbProduct) {
    const parseMultilineText = (text) => {
      if (!text) return [];
      try {
        return JSON.parse(text);
      } catch {
        return text.split(',').map(s => s.trim()).filter(Boolean);
      }
    };

    return {
      Id: dbProduct.Id,
      title: dbProduct.title_c || '',
      category: dbProduct.category_c || '',
      subcategory: dbProduct.subcategory_c || '',
      brand: dbProduct.brand_c || '',
      price: dbProduct.price_c || 0,
      originalPrice: dbProduct.original_price_c || 0,
      discount: dbProduct.discount_c || 0,
      images: parseMultilineText(dbProduct.images_c),
      sizes: parseMultilineText(dbProduct.sizes_c),
      colors: parseMultilineText(dbProduct.colors_c),
      description: dbProduct.description_c || '',
      rating: dbProduct.rating_c || 0,
      reviewCount: dbProduct.review_count_c || 0,
      inStock: dbProduct.in_stock_c || false,
      tags: parseMultilineText(dbProduct.tags_c)
    };
  }
}

export const productService = new ProductService();