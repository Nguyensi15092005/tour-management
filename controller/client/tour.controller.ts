import { Request, Response } from "express";
import Tour from "../../models/tour.model";


export const index = async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    raw: true // ko có các key lung tung
  });
  console.log(tours)
  res.render("client/pages/tours/index", {
    tours: tours
  })
} 