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
        where: {
            id: orderId
        }
    })

    // Lưu data vào bảng order_item
    for (const item of data.cart) {
        const dataItem = {
            orderId: orderId,
            tourId: item.tourId,
            quantity: item.quantity
        };

        const inforTour = await Tour.findOne({
            raw: true,
            where: {
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


export const orderSuccess = async (req: Request, res: Response) => {
    const orderCode = req.query.orderCode;
    const order = await Order.findOne({
        raw: true,
        where: {
            code: orderCode,
            deleted: false
        }
    });

    const orderItem = await OrderItem.findAll({
        raw: true,
        where: {
            orderId: order["id"],
        }
    });

    for (const item of orderItem) {
        item["price_special"] = item["price"] * (1 - item["discount"] / 100);
        item["total"] = item["price_special"] * item["quantity"];
        const tourInfo = await Tour.findOne({
            raw: true,
            where: {
                id: item["tourId"]
            }
        });
        item["image"] = JSON.parse(tourInfo["images"])[0];
        item["title"] = tourInfo["title"];
        item["slug"] = tourInfo["slug"];

        console.log(item)
    }

    order["total_price"] = orderItem.reduce((sum, item) => sum + item["total"], 0);


    // console.log(orderItem)
    res.render("client/pages/order/success", {
        pageTitle: "Đặt hàng thành công",
        orderItem: orderItem,
        order: order
    })
}