const petTypes = {
    "types": [
      {
        "name": "Dog",
        "coats": [
          "Hairless",
          "Short",
          "Medium",
          "Long",
          "Wire",
          "Curly"
        ],
        "colors": [
          "Apricot / Beige",
          "Bicolor",
          "Black",
          "Brindle",
          "Brown / Chocolate",
          "Golden",
          "Gray / Blue / Silver",
          "Harlequin",
          "Merle (Blue)",
          "Merle (Red)",
          "Red / Chestnut / Orange",
          "Sable",
          "Tricolor (Brown, Black, & White)",
          "White / Cream",
          "Yellow / Tan / Blond / Fawn"
        ],
        "genders": [
          "Male",
          "Female"
        ],
        "_links": {
          "self": {
            "href": "/v2/types/dog"
          },
          "breeds": {
            "href": "/v2/types/dog/breeds"
          }
        }
      },
      {
        "name": "Cat",
        "coats": [
          "Hairless",
          "Short",
          "Medium",
          "Long"
        ],
        "colors": [
          "Black",
          "Black & White / Tuxedo",
          "Blue Cream",
          "Blue Point",
          "Brown / Chocolate",
          "Buff & White",
          "Buff / Tan / Fawn",
          "Calico",
          "Chocolate Point",
          "Cream / Ivory",
          "Cream Point",
          "Dilute Calico",
          "Dilute Tortoiseshell",
          "Flame Point",
          "Gray & White",
          "Gray / Blue / Silver",
          "Lilac Point",
          "Orange & White",
          "Orange / Red",
          "Seal Point",
          "Smoke",
          "Tabby (Brown / Chocolate)",
          "Tabby (Buff / Tan / Fawn)",
          "Tabby (Gray / Blue / Silver)",
          "Tabby (Leopard / Spotted)",
          "Tabby (Orange / Red)",
          "Tabby (Tiger Striped)",
          "Torbie",
          "Tortoiseshell",
          "White"
        ],
        "genders": [
          "Male",
          "Female"
        ],
        "_links": {
          "self": {
            "href": "/v2/types/cat"
          },
          "breeds": {
            "href": "/v2/types/cat/breeds"
          }
        }
      },
      {
        "name": "Rabbit",
        "coats": [
          "Short",
          "Long"
        ],
        "colors": [
          "Agouti",
          "Black",
          "Blue / Gray",
          "Brown / Chocolate",
          "Cream",
          "Lilac",
          "Orange / Red",
          "Sable",
          "Silver Marten",
          "Tan",
          "Tortoiseshell",
          "White"
        ],
        "genders": [
          "Male",
          "Female"
        ],
        "_links": {
          "self": {
            "href": "/v2/types/rabbit"
          },
          "breeds": {
            "href": "/v2/types/rabbit/breeds"
          }
        }
      },
      {
        "name": "Small & Furry",
        "coats": [
          "Hairless",
          "Short",
          "Long"
        ],
        "colors": [
          "Agouti",
          "Albino",
          "Black",
          "Black Sable",
          "Blue / Gray",
          "Brown / Chocolate",
          "Calico",
          "Champagne",
          "Cinnamon",
          "Cream",
          "Orange / Red",
          "Sable",
          "Tan",
          "Tortoiseshell",
          "White",
          "White (Dark-Eyed)"
        ],
        "genders": [
          "Male",
          "Female"
        ],
        "_links": {
          "self": {
            "href": "/v2/types/small-furry"
          },
          "breeds": {
            "href": "/v2/types/small-furry/breeds"
          }
        }
      },
      {
        "name": "Horse",
        "coats": [],
        "colors": [
          "Appaloosa",
          "Bay",
          "Bay Roan",
          "Black",
          "Blue Roan",
          "Brown",
          "Buckskin",
          "Champagne",
          "Chestnut / Sorrel",
          "Cremello",
          "Dapple Gray",
          "Dun",
          "Gray",
          "Grullo",
          "Liver",
          "Paint",
          "Palomino",
          "Perlino",
          "Piebald",
          "Pinto",
          "Red Roan",
          "Silver Bay",
          "Silver Buckskin",
          "Silver Dapple",
          "White"
        ],
        "genders": [
          "Male",
          "Female"
        ],
        "_links": {
          "self": {
            "href": "/v2/types/horse"
          },
          "breeds": {
            "href": "/v2/types/horse/breeds"
          }
        }
      },
      {
        "name": "Bird",
        "coats": [],
        "colors": [
          "Black",
          "Blue",
          "Brown",
          "Buff",
          "Gray",
          "Green",
          "Olive",
          "Orange",
          "Pink",
          "Purple / Violet",
          "Red",
          "Rust / Rufous",
          "Tan",
          "White",
          "Yellow"
        ],
        "genders": [
          "Male",
          "Female",
          "Unknown"
        ],
        "_links": {
          "self": {
            "href": "/v2/types/bird"
          },
          "breeds": {
            "href": "/v2/types/bird/breeds"
          }
        }
      },
      {
        "name": "Scales, Fins & Other",
        "coats": [],
        "colors": [
          "Black",
          "Blue",
          "Brown",
          "Gray",
          "Green",
          "Iridescent",
          "Orange",
          "Purple",
          "Red",
          "Tan",
          "White",
          "Yellow"
        ],
        "genders": [
          "Male",
          "Female",
          "Unknown"
        ],
        "_links": {
          "self": {
            "href": "/v2/types/scales-fins-other"
          },
          "breeds": {
            "href": "/v2/types/scales-fins-other/breeds"
          }
        }
      },
      {
        "name": "Barnyard",
        "coats": [
          "Short",
          "Long"
        ],
        "colors": [
          "Agouti",
          "Black",
          "Black & White",
          "Brindle",
          "Brown",
          "Gray",
          "Pink",
          "Red",
          "Roan",
          "Spotted",
          "Tan",
          "White"
        ],
        "genders": [
          "Male",
          "Female"
        ],
        "_links": {
          "self": {
            "href": "/v2/types/barnyard"
          },
          "breeds": {
            "href": "/v2/types/barnyard/breeds"
          }
        }
      }
    ]
  };
  
  export default petTypes;
  