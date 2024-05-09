import { supabase } from "../utils/supabaseClient";

export const generateReferenceNumber = (productName, categoryID) => {
  const combined = `${productName}_${categoryID}`;
  return simpleHash(combined);
};

const simpleHash = (input) => {
  let hash = 0;
  if (input.length === 0) {
    return hash;
  }
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
};

export const insertHashedProduct = async (productID, referenceNumber) => {
  try {
    const { error } = await supabase
      .from("apparel")
      .update({ hash: referenceNumber })
      .eq("apparel_id", productID);

    console.log(referenceNumber);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error updating hash: ", error.message);
  }
};


// useEffect(() => {
//     const fetchProducts = async () => {
//         try {
//         const {data} = await supabase.from('apparel').select("*");

//         data.forEach(async product => {
//             const referenceNumber = generateReferenceNumber(product.apparel_name, product.category_id);
//             await insertHashedProduct(product.apparel_id, referenceNumber);
//         });


//     }catch(error){
//         console.log("error");
//     }

//     }

//     // fetchProducts();
//   }, []);
