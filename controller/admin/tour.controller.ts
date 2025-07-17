import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/categories.model";
import { generateTourCode } from "../../helpers/generate";
import { systemConfig } from "../../config/system";
import TourCategory from "../../models/tour-category.model";

export const index = async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    raw: true,
    where: {
      deleted: false
    }
  });
  tours.forEach(item =>{
    if(item["images"]){
      item["image"] = JSON.parse(item["images"])[0];
    }
    item["price_special"] = item["price"] * (1-item["discount"]/100);
  })
  console.log(tours)

  res.render("admin/pages/tour/index", {
    pageTitle: "Danh sách tour",
    tours: tours

  })
}

export const create = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    raw: true,
    where: {
      deleted: false,
      status: "active"
    }
  })
  res.render("admin/pages/tour/create", {
    pageTitle: "Thêm mới tour",
    categories: categories
  })
}

export const createPost = async (req: Request, res: Response) => {
  console.log(req.body.images)
  const countTount = await Tour.count();
  const code = generateTourCode(countTount+1);
  if(req.body.position == ""){
    req.body.position = countTount + 1;
  }
  else{
    req.body.position = parseInt(req.body.position);
  }
  const dataTour = {
    title: req.body.title,
    code: code,
    images: JSON.stringify(req.body.images),
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    stock: parseInt(req.body.stock),
    timeStart: req.body.timeStart,
    position: req.body.position,
    status: req.body.status,
    information: req.body.information,
    schedule: req.body.schedule
  }
  const tour = await Tour.create(dataTour);

  const tourId = tour["id"];
  const dataTourCategory ={
    tour_id: tourId,
    category_id: parseInt(req.body.category_id)
  };

  await TourCategory.create(dataTourCategory);

  res.redirect(`${systemConfig.prefexAdmin}/tours`)
}