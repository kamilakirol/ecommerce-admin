"use client";

import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const [productInfo, setProductInfo] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, []);

  return (
    <>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </>
  );
}
