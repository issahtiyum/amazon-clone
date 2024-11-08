import { Product, Appliance, Clothing } from "../../data/products.js";

describe('test suite: Product class', () => {
  it('creates a product class for a product', () => {
    const product1 = new Product({
       id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    })

    expect(product1.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs")
    expect(product1.getPrice()).toEqual('$10.90')
    expect(product1.extraInfoHTML()).toEqual('')
  })
})
describe("test suite: Clothing class - child of Product class", () => {
  it("creates a clothing class for apparel", () => {
    const product1 = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
    expect(product1.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack')
    expect(product1.extraInfoHTML()).toContain(`
      <a href="${product1.sizeChartLink}" target = "_blank">
        Size Chart 
      </a>
    `)
  })
})

describe('test suite: appliance class; child of product class', () => {
  it('creates an appliance class for appliances', () => {
    const product1 = new Appliance({
      id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
      image: "images/products/countertop-blender-64-oz.jpg",
      name: "Countertop Blender - 64oz, 1400 Watts",
      rating: {
        stars: 4,
        count: 3
      },
      priceCents: 10747,
      keywords: [
        "food blenders",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    })

    expect(product1.name).toEqual("Countertop Blender - 64oz, 1400 Watts")
    expect(product1.extraInfoHTML()).toContain(
      `
      <a href="images/appliance-instructions.png" target = "_blank">
        Instructions 
      </a>
      <a href="images/appliance-warranty.png" target = "_blank">
        Warranty 
      </a>
    `
    )
  })
})
