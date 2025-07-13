import { Request, Response } from "express";
import Tour from "../../models/tour.model";


export const index = async (req: Request, res: Response) => {
  //SELECT * FROM tour WHERE deleted = false AND status = "active";
  const tours = await Tour.findAll({
    where:{
      deleted: false,
      status: "active"
    },
    raw: true // ko có các key lung tung
  });
  console.log(tours)
  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours
  })
} 