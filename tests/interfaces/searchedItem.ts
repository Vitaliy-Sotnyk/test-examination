export default interface SearchedItem {
    id: number;
    title: string;
    description: string;
    promotion: {
            top_ad: boolean,
        },
    params: [
        {
          key?: string,
          name?: string,
          value?: {
            label?: string
          }
        },
        {
          key: string,          
          name: string,
          value: {
            value: number,
            currency: string,
            label: string
          }
        }
      ]
    location: {
       city: {
          name: string,
          normalized_name: string
        },
        district?: {
          name: string
        },
        region: {
          name: string
        }
    };
    photos: [
        {  
            filename: string
        }
    ]
    category: {
        type: string
    }; 
}