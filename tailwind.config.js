/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		spacing: {
  			'11': '2.75rem',
  			'13': '3.25rem',
  			'14': '3.5rem',
  			'15': '3.75rem',
  			'16': '4rem',
  			'17': '4.25rem',
  			'18': '4.5rem',
  			'19': '4.75rem',
  			'21': '5.25rem',
  			'22': '5.5rem',
  			'25': '6.25rem',
  			'26': '6.5rem',
  			'27': '6.75rem',
  			'29': '7.25rem',
  			'30': '7.5rem',
  			'31': '7.75rem',
  			'33': '8.25rem',
  			'34': '8.5rem',
  			'35': '8.75rem',
  			'39': '9.75rem',
  			'40': '10rem',
  			'44': '11rem',
  			'45': '11.25rem',
  			'46': '11.5rem',
  			'49': '12.25rem',
  			'50': '12.5rem',
  			'52': '13rem',
  			'54': '13.5rem',
  			'55': '13.75rem',
  			'59': '14.75rem',
  			'60': '15rem',
  			'65': '16.25rem',
  			'67': '16.75rem',
  			'70': '17.5rem',
  			'73': '18.25rem',
  			'75': '18.75rem',
  			'90': '22.5rem',
  			'94': '23.5rem',
  			'95': '23.75rem',
  			'100': '25rem',
  			'115': '28.75rem',
  			'125': '31.25rem',
  			'150': '37.5rem',
  			'180': '45rem',
  			'203': '50.75rem',
  			'230': '57.5rem',
  			'4.5': '1.125rem',
  			'5.5': '1.375rem',
  			'6.5': '1.625rem',
  			'7.5': '1.875rem',
  			'8.5': '2.125rem',
  			'9.5': '2.375rem',
  			'10.5': '2.625rem',
  			'11.5': '2.875rem',
  			'12.5': '3.125rem',
  			'13.5': '3.375rem',
  			'14.5': '3.625rem',
  			'15.5': '3.875rem',
  			'16.5': '4.125rem',
  			'17.5': '4.375rem',
  			'18.5': '4.625rem',
  			'19.5': '4.875rem',
  			'21.5': '5.375rem',
  			'22.5': '5.625rem',
  			'24.5': '6.125rem',
  			'25.5': '6.375rem',
  			'27.5': '6.875rem',
  			'29.5': '7.375rem',
  			'32.5': '8.125rem',
  			'34.5': '8.625rem',
  			'36.5': '9.125rem',
  			'37.5': '9.375rem',
  			'39.5': '9.875rem',
  			'42.5': '10.625rem',
  			'47.5': '11.875rem',
  			'52.5': '13.125rem',
  			'54.5': '13.625rem',
  			'55.5': '13.875rem',
  			'62.5': '15.625rem',
  			'67.5': '16.875rem',
  			'72.5': '18.125rem',
  			'132.5': '33.125rem',
  			'171.5': '42.875rem',
  			'187.5': '46.875rem',
  			'242.5': '60.625rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

