import ProductCard from "./ProductCard";

const ProductList = ({ allPros }) => {
  return (
    <section className="mt-24 grid grid-cols-4 grid-rows-2 my-20 gap-y-8 gap-x-4">
      {allPros.map((item) => {
        return (
          <div key={item.name}>
            <ProductCard
              id={item._id}
              slug={item.slug}
              name={item.name}
              price={item.price}
              colors={item.colors}
              size={item.size}
              imageUrl={item.imgUrl}
              imageHoverUrl={item.imgUrlHover}
            />
          </div>
        );
      })}
    </section>
  );
};

export default ProductList;
