import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";


export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;
  console.log(slugCategory)
  //SELECT * FROM tour WHERE deleted = false AND status = "active";
  // const tours = await Tour.findAll({
  //   where:{
  //     deleted: false,
  //     status: "active"
  //   },
  //   raw: true // ko có các key lung tung
  // });
  // console.log(tours)


  /*SELECT tours.*, price * (1 - discount / 100) AS price_special
  FROM tours
  JOIN tours_categories ON tours.id = tours_categories.tour_id
  JOIN categories ON tours_categories.category_id = categories.id
  WHERE
    categories.slug = 'du-lich-trong-nuoc'
    AND categories.deleted = false
    AND categories.status = 'active'
    AND tours.deleted = false
    AND tours.status = 'active';
  */
  const tours = await sequelize.query(`
    SELECT tour.*, ROUND(price * (1 - discount / 100),0) AS price_special
    FROM tour
    JOIN tour_categories ON tour.id = tour_categories.tour_id
    JOIN categories ON tour_categories.category_id = categories.id
    WHERE
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tour.deleted = false
      AND tour.status = 'active';  
    `,{
      type: QueryTypes.SELECT //kiểu truy vấn sẻ ko bị lồng 2 mảng 
    });
    // Hàm ROUNT 

    tours.forEach(item => {
      if(item["images"]){
        const images = JSON.parse(item["images"]);
        item["image"] = images[0];
      }
      item["price_special"] = parseFloat(item["price_special"])
    })
  console.log(tours)
  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours
  })
};

