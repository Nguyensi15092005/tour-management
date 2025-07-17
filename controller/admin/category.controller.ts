import { Request, Response } from "express";
import Category from "../../models/categories.model";

export const index = async (req: Request, res: Response) =>{
    const categories = await Category.findAll({
        raw: true,
        where: {
            deleted: false
        }
    });
    console.log( categories)
    res.render("admin/pages/categories/index", {
        pageTitle: "Danh mục tour",
        categories: categories
    })
}