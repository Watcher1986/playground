let popularProd;
let totalPrice = 0;
let isEmpty = true;
let initialEmptyCartItem;
let checkoutBtnPrice;

const currencyNormalize = (amount) => {
  const fixedAmount = (amount / 100).toFixed(2);
  return fixedAmount[0] + ',' + fixedAmount.slice(1);
};

const getCartProdsCount = () =>
  document.querySelectorAll('.CartItemWrapper').length;

const removeCartFooter = () => {
  const formBody = document.querySelector('.cart-body-form');
  const footer = document.querySelector('.cart--footer');
  formBody.removeChild(footer);
};

const createNode = (tag, classes) => {
  const node = document.createElement(tag);
  node.classList.add(...classes);
  return node;
};

// get product from db
async function getProduct(product_name) {
  return await fetch(`https://blank-sunglasses.com/products/${product_name}.js`)
    .then((res) => res.json())
    .then((data) => data);
}

// generate cart image
const getCartImage = (imgSrc, altText) => {
  const imageWrapper = createNode('div', [
    'CartItem__ImageWrapper',
    'AspectRatio',
  ]);

  const imgAspectRatio = createNode('div', ['AspectRatio']);
  imgAspectRatio.style.aspectRatio = '1.0';

  const image = createNode('img', ['CartItem__Image']);
  image.src = imgSrc;
  image.alt = altText;

  imgAspectRatio.appendChild(image);
  imageWrapper.appendChild(imgAspectRatio);

  return imageWrapper;
};

const getPopularProdActionsWrapper = (cartItemWrapper, price) => {
  let quantity = 1;
  const actionsWrapper = createNode('div', ['CartItem__Actions', 'Heading']);
  !isEmpty && (actionsWrapper.style.justifyContent = 'space-between');
  actionsWrapper.style.width = isEmpty ? 'max-content' : 'auto';

  const quantySelectorWrapper = createNode('div', [
    'CartItem__QuantitySelector',
  ]);
  const quantySelector = createNode('div', ['QuantitySelector']);
  const minusBtn = createNode('a', ['QuantitySelector__Btn']);
  minusBtn.href = '#';
  minusBtn.innerText = '-';
  minusBtn.title = `Set quantity to ${quantity - 1}`;

  const input = createNode('input', ['QuantitySelector__Input']);
  input.type = 'text';
  input.value = quantity;
  input.pattern = '[0-9]*';
  const plusBtn = createNode('a', ['QuantitySelector__Btn']);
  plusBtn.href = '#';
  plusBtn.title = `Set quantity to ${quantity + 1}`;
  plusBtn.innerText = '+';

  minusBtn.onclick = (e) => {
    e.preventDefault();
    if (quantity === 1) return;
    quantity--;
    totalPrice -= price;
    checkoutBtnPrice &&
      (checkoutBtnPrice.innerText = currencyNormalize(totalPrice));
    input.value = quantity;
    minusBtn.title = `Set quantity to ${quantity - 1}`;
    plusBtn.title = `Set quantity to ${quantity + 1}`;
  };

  plusBtn.onclick = (e) => {
    e.preventDefault();
    quantity++;
    totalPrice += price;
    checkoutBtnPrice &&
      (checkoutBtnPrice.innerText = currencyNormalize(totalPrice));
    input.value = quantity;
    minusBtn.title = `Set quantity to ${quantity - 1}`;
    plusBtn.title = `Set quantity to ${quantity + 1}`;
  };

  quantySelector.appendChild(minusBtn);
  quantySelector.appendChild(input);
  quantySelector.appendChild(plusBtn);
  quantySelectorWrapper.appendChild(quantySelector);

  const removeBtn = createNode('a', [
    'CartItem__Remove',
    'Link',
    'Link--underline',
  ]);
  removeBtn.href = '#';
  removeBtn.innerText = 'Remove';
  removeBtn.title = 'Remove this item from your cart';
  removeBtn.onclick = (e) => {
    e.preventDefault();
    const cartItemList = document.querySelector('.Cart__ItemList');
    cartItemList.removeChild(cartItemWrapper);
    if (!getCartProdsCount()) {
      isEmpty = true;
      removeCartFooter();
      cartItemList.appendChild(initialEmptyCartItem);
    }
  };

  const addToCartBtn = createNode('button', ['add-to-cart-btn']);
  addToCartBtn.innerText = 'Add to cart';
  addToCartBtn.type = 'button';
  addToCartBtn.onclick = (e) => {
    e.preventDefault();
    isEmpty = false;
    const { cartItemWrapper, itemPrice } = generateCartItem(popularProd);
    totalPrice += itemPrice;
    const cartFooter = generateCartFooter();
    const cartItemList = document.querySelector('.Cart__ItemList');
    const cartBody = document.querySelector('.cart-body-form');
    cartItemList.removeChild(initialEmptyCartItem);
    cartBody.appendChild(cartFooter);
    cartItemList.appendChild(cartItemWrapper);
  };

  isEmpty && actionsWrapper.appendChild(addToCartBtn);
  actionsWrapper.appendChild(quantySelectorWrapper);
  !isEmpty && actionsWrapper.appendChild(removeBtn);

  return actionsWrapper;
};

function generateCartItem(product) {
  let variant = product.variants[0];
  let itemImg = variant.featured_image.src;
  let itemImgAltText = variant.featured_image?.alt;
  let itemName = product.title;
  let itemPrice = variant.price;

  const cartItemWrapper = createNode('div', ['CartItemWrapper']);
  const cartItem = createNode('div', ['CartItem']);
  const cartItemInfo = createNode('div', ['CartItem__Info']);

  const cartItemName = createNode('h2', ['CartItem__Title', 'Heading']);
  const cartItemNameLink = document.createElement('a');
  cartItemNameLink.src = `${product?.url}?variant=${variant.id}`;
  cartItemNameLink.innerText = itemName;
  cartItemName.appendChild(cartItemNameLink);

  const cartItemMeta = createNode('div', ['CartItem__Meta', 'Heading']);
  const cartItemVariant = createNode('p', ['CartItem__Variant']);
  cartItemVariant.innerText = variant.title;
  cartItemMeta.appendChild(cartItemVariant);

  const cartItemPriceList = createNode('div', ['CartItem__PriceList']);
  const cartItemPrice = createNode('span', ['CartItem__Price', 'Price']);
  cartItemPrice.innerText = currencyNormalize(itemPrice);
  cartItemPriceList.appendChild(cartItemPrice);
  cartItemMeta.appendChild(cartItemPriceList);

  cartItemInfo.appendChild(cartItemName);
  cartItemInfo.appendChild(cartItemMeta);
  const actions = getPopularProdActionsWrapper(cartItemWrapper, itemPrice);
  cartItemInfo.appendChild(actions);

  const cartImage = getCartImage(itemImg, itemImgAltText);
  cartItem.appendChild(cartImage);
  cartItem.appendChild(cartItemInfo);
  cartItemWrapper.appendChild(cartItem);

  return { cartItemWrapper, itemPrice };
}

function generateCartFooter() {
  const cartFooter = createNode('div', ['cart--footer']);

  const addOrderNoteBtn = createNode('button', ['Cart__NoteButton']);
  addOrderNoteBtn.type = 'button';
  addOrderNoteBtn.innerText = 'Add Order Note';
  cartFooter.appendChild(addOrderNoteBtn);

  const shipTaxBanner = createNode('p', ['Cart__Taxes']);
  shipTaxBanner.innerText = 'Shipping & taxes calculated at checkout';
  cartFooter.appendChild(shipTaxBanner);

  const nudgeOffer = createNode('div', ['Cart__NudgeOffer']);

  const prodImgWrapper = createNode('div', ['product-image-wrappper']);
  const prodImg = createNode('img', ['product-image']);
  prodImg.src =
    '//cdn.shopify.com/s/files/1/0532/8070/2649/products/the-case-389658_medium.jpg';
  prodImgWrapper.appendChild(prodImg);
  nudgeOffer.appendChild(prodImgWrapper);

  const nudgeWrapper = createNode('div', ['nudge-wrapper']);

  const offerText = createNode('div', ['offer-text']);
  offerText.innerText = 'Protect your glasses with THE CASE.';
  const prodTitleWrapper = createNode('div', ['product-title-wrapper']);
  nudgeWrapper.appendChild(offerText);
  nudgeWrapper.appendChild(prodTitleWrapper);

  const form = document.createElement('form');
  form.style.display = 'block';
  form.action = '/cart/add';
  form.method = 'post';

  const addToCartBtn = createNode('button', ['bttn']);
  addToCartBtn.type = 'submit';
  addToCartBtn.name = 'add';
  addToCartBtn.innerText = 'Add To Cart';
  addToCartBtn.onclick =
    "InCartUpsell.acceptShopifyOffer(143397, 'a', this.form); return false;";
  form.appendChild(addToCartBtn);
  nudgeWrapper.appendChild(form);
  nudgeOffer.appendChild(nudgeWrapper);
  cartFooter.appendChild(nudgeOffer);

  const checkoutBtn = createNode('button', ['Cart__CheckoutButton']);
  checkoutBtn.type = 'submit';
  checkoutBtn.name = 'checkout';

  const btnText = document.createElement('span');
  btnText.innerText = 'Checkout';
  const btnSeparator = createNode('span', ['Button__SeparatorDot']);
  const btnPrice = createNode('span', ['checkout-btn-price']);
  btnPrice.innerText = currencyNormalize(totalPrice);
  checkoutBtnPrice = btnPrice;
  checkoutBtn.appendChild(btnText);
  checkoutBtn.appendChild(btnSeparator);
  checkoutBtn.appendChild(btnPrice);

  cartFooter.appendChild(checkoutBtn);

  return cartFooter;
}

function generateCartBody(cartItem) {
  const drawerContent = createNode('form', ['cart-body-form']);
  drawerContent.action = '/cart';
  drawerContent.method = 'POST';
  drawerContent.novalidate = true;

  const cartItemList = createNode('div', ['Cart__ItemList']);
  const drawerMain = createNode('div', ['Drawer__Main']);
  drawerMain.setAttribute('data-scrollable', '');
  const drawerContainer = createNode('div', ['Drawer__Container']);

  cartItemList.appendChild(cartItem);
  drawerContainer.appendChild(cartItemList);
  drawerMain.appendChild(drawerContainer);
  drawerContent.appendChild(drawerMain);

  document.querySelector('.Drawer--fromRight').appendChild(drawerContent);
}

function handleEmptyCart() {
  const wrap = document.querySelector('.Drawer--fromRight');
  const cart = document.querySelector("[action='/cart']");

  const emptyCartTitle = document.querySelector('.u-h5');

  if (emptyCartTitle) {
    wrap.removeChild(cart);

    const { cartItemWrapper } = generateCartItem(popularProd);
    generateCartBody(cartItemWrapper);
    initialEmptyCartItem = cartItemWrapper;
    return;
  }

  const cartItemWrapper = generateCartItem(popularProd);
  generateCartBody(cartItemWrapper);
}

const handleRemoveFromCart = () => {
  const removeBtns = document.querySelectorAll('.CartItem__Remove');

  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const wrap = document.querySelector('.Drawer--fromRight');
      const cart = document.querySelector("[action='/cart']");

      const emptyCartTitle = document.querySelector('.u-h5');

      if (emptyCartTitle) {
        isEmpty = true;
        wrap.removeChild(cart);

        const { cartItemWrapper } = generateCartItem(popularProd);
        generateCartBody(cartItemWrapper);
        initialEmptyCartItem = cartItemWrapper;
        return;
      }
    });
  });
};

const handleAddToCart = async () => {
  const prodName = window.location.pathname.split('/')[2];
  const product = await getProduct(prodName);
  const { cartItemWrapper, itemPrice } = generateCartItem(product);

  const btns = document.querySelectorAll('[data-action="add-to-cart"]');
  btns.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      totalPrice += itemPrice;
      checkoutBtnPrice &&
        (checkoutBtnPrice.innerText = currencyNormalize(totalPrice));
      document.querySelector('.Cart__ItemList').appendChild(cartItemWrapper);
    })
  );
};

const setNotEmptyCartBadge = () => {
  const iconWrapper = document.querySelector('[aria-label="Open cart"]');
  const icon = iconWrapper.getElementsByClassName('hidden-phone')[0];
  const badge = createNode('span', ['Header__CartDot', 'is-visible']);
  icon.appendChild(badge);
};

document.addEventListener('DOMContentLoaded', async (e) => {
  popularProd = await getProduct('3d');

  setNotEmptyCartBadge();
  handleEmptyCart();
  handleAddToCart();
  handleRemoveFromCart();
});
