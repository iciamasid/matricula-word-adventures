
/**
 * Returns information about a country based on level and language
 */
export function getCountryInfo(level: number, language: string) {
  const countries = [
    {
      es: {
        city: "Madrid",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Madrid",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Barcelona",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Barcelona",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Valencia",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Valencia",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Sevilla",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Seville",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Granada",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Granada",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Toledo",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Toledo",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Bilbao",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Bilbao",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Córdoba",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Cordoba",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Zaragoza",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Zaragoza",
        country: "Spain",
        flag: "🇪🇸"
      }
    },
    {
      es: {
        city: "Málaga",
        country: "España",
        flag: "🇪🇸"
      },
      en: {
        city: "Malaga",
        country: "Spain",
        flag: "🇪🇸"
      }
    }
  ];

  // Make sure we don't go out of bounds and provide a default
  let index = 0;
  try {
    index = Math.abs(level % countries.length);
  } catch (error) {
    console.error("Error calculating country index:", error);
  }
  
  const lang = language === 'en' ? 'en' : 'es';
  
  // Provide a fallback if something goes wrong
  try {
    return countries[index][lang];
  } catch (error) {
    console.error("Error getting country info:", error);
    return {
      city: "Madrid",
      country: "España",
      flag: "🇪🇸"
    };
  }
}
