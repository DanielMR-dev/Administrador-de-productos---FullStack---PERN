import { Link, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";


type ProductDetailsProps = {
    product: Product
}

export default function ProductDetails({product} : ProductDetailsProps) {

    const isAvailable = product.availability;

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {isAvailable ? 'Disponible' : 'No Disponible'}
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <Link
                        to={`products/${product.id}/edit`}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    >Editar</Link>
                </div>
            </td>
        </tr> 
    )
}
