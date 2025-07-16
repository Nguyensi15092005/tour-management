import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";

export const index = async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data)
    const dataOrder = {
        code: "",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial"
    };
    const order = await Order.create(dataOrder);

    const orderId = order.dataValues.id
    const code = generateOrderCode(orderId);
    await Order.update({
        code: code
    }, {
        where:{
            id: orderId
        }
    })
    
    // Lưu data vào bảng order_item
    for (const item of data.cart) {
        const dataItem = {
            orderId:orderId,
            tourId: item.tourId,
            quantity:item.quantity
        };

        const inforTour = await Tour.findOne({
            raw:true,
            where:{
                id: item.tourId,
                deleted: false,
                status: "active"
            }
        })
        dataItem["price"] = inforTour["price"];
        dataItem["discount"] = inforTour["discount"];
        dataItem["timeStart"] = inforTour["timeStart"];
        await OrderItem.create(dataItem)
    }


    res.json({
        code: 200,
        message: "Đặt tour thành công",
        orderCode: code
    })
}