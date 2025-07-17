import { Request, Response } from "express";
import Tour from "../../models/tour.model";

export const index = async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    raw: true,
    where: {
      deleted: false
    }
  });
  tours.forEach(item =>{
    item["image"] = JSON.parse(item["images"])[0];
    item["price_special"] = item["price"] * (1-item["discount"]/100);
  })
  console.log(tours)

  res.render("admin/pages/tour/index", {
    pageTitle: "Danh sách tour",
    tours: tours

  })
}