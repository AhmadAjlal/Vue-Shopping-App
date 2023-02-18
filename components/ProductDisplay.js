app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template:
        `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" alt="">
            </div>
            <div class="product-info">
                <h1> {{ title }} </h1>
                <p v-if="inStock">In Stock ({{inStock}} Items)</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }} </p>
                <ul>
                    <li v-for="detail in details"> {{ detail }}</li>
                </ul>
                <div v-for="(variant, index) in variants" :key="variant.id" :style="{backgroundColor: variant.color}"
                     class="color-circle" @mouseover="updateVariant(index)"></div>
                <button @click="addToCart" class="button" :class="{disabledButton: !inStock}" :disabled="!inStock">
                    Add To Cart
                </button>
            </div>
        </div>
        <review-list :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Js',
            selectedVariant: 0,
            details: ['50% Cotton', '30% Wool', '20% Polyester'],
            variants: [
                {
                    id: 2234,
                    color: 'Green',
                    image: 'assets/images/socks_green.png',
                    quantity: 50,
                },
                {
                    id: 2235,
                    color: 'Blue',
                    image: 'assets/images/socks_blue.png',
                    quantity: 0,
                },
            ],
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
            // this.cart += 1;
        },
        removeFromCart() {
            this.cart -= 1;
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            }
            return '$2.99';
        }
    }
})