import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList";
import { getProductsOfCollection } from "../../utils/apiRequest";

const Collections = () => {
  const [productList, setProductsList] = useState([]);

  const params = useParams();

  useEffect(() => {
    getProductsOfCollection(params.collectionId.split("}")[0], setProductsList);
  }, [params.collectionId]);

  return (
    <div className="px-14">
      <section>
        <ProductList allPros={productList} />
      </section>
    </div>
  );
};

export default Collections;
