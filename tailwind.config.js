const plugin = require('tailwindcss/plugin')
module.exports = {
  // prefix: 'tw-',
  theme: {
    screens: {
      's': '640px',
      'm': '960px',
      'l': '1200px',
      'xl': '1600px',
    },
    extend: {
      borderStyle: {
        'inherit': 'inherit',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
      },
      spacing: {
        '1/2%': '50%',
        '1/3%': '33.333333%',
        '2/3%': '66.666667%',
        '1/4%': '25%',
        '3/4%': '75%',
        '1/5%': '20%',
        '2/5%': '40%',
        '3/5%': '60%',
        '4/5%': '80%',
        '1/6%': '16.666667%',
        '5/6%': '83.333333%',
        '1/7%': '14.285714%',
        '2/7%': '28.571429%',
        '3/7%': '42.857143%',
        '4/7%': '57.142857%',
        '5/7%': '71.428571%',
        '6/7%': '85.714286%',
        '1/8%': '12.5%',
        '3/8%': '37.5%',
        '5/8%': '62.5%',
        '7/8%': '87.5%',
        '1/9%': '11.111111%',
        '2/9%': '22.222222%',
        '4/9%': '44.444444%',
        '5/9%': '55.555556%',
        '7/9%': '77.777778%',
        '8/9%': '88.888889%',
        '1/10%': '10%',
        '3/10%': '30%',
        '7/10%': '70%',
        '9/10%': '90%',
        '1/11%': '9.090909%',
        '2/11%': '18.181818%',
        '3/11%': '27.272727%',
        '4/11%': '36.363636%',
        '5/11%': '45.454545%',
        '6/11%': '54.545455%',
        '7/11%': '63.636364%',
        '8/11%': '72.727273%',
        '8/11%': '81.818182%',
        '9/11%': '81.818182%',
        '10/11%': '90.909091%',
        '1/12%': '8.333333%',
        '5/12%': '41.666667%',
        '7/12%': '58.333333%',
        '11/12%': '91.666667%',
        '9/16%': '56.25%',
        '3/2%': '150%',
        '4/3%': '133.333333%',
        '5/2%': '250%',
        '5/3%': '166.666667%',
        '5/4%': '125%',
        '6/5%': '120%',
        '7/2%': '350%',
        '7/3%': '233.333333%',
        '7/4%': '175%',
        '7/5%': '140%',
        '7/6%': '116.666667%',
        '8/3%': '266.666667%',
        '8/5%': '160%',
        '8/7%': '114.285714%',
        '9/2%': '450%',
        '9/4%': '225%',
        '9/5%': '180%',
        '9/7%': '128.571429%',
        '9/8%': '112.5%',
        '10/3%': '333.333333%',
        '10/7%': '142.857143%',
        '10/9%': '111.111111%',
        '11/2%': '550%',
        '11/3%': '366.666667%',
        '11/4%': '275%',
        '11/5%': '220%',
        '11/6%': '183.333333%',
        '11/7%': '157.142857%',
        '11/8%': '137.5%',
        '11/9%': '122.222222%',
        '11/10%': '110%',
        '12/5%': '240%',
        '12/7%': '171.428571%',
        '12/9%': '133.333333%',
        '12/11%': '109.090909%',
        '16/9%': '177.777778%',
        '100%': '100%',
        '200%': '200%',
        '300%': '300%',
        '400%': '400%',
        '500%': '500%',
        '600%': '600%',
        '700%': '700%',
        '800%': '800%',
        '900%': '900%',
        'inherit': 'inherit',
        'initial': 'initial',
      }
    }
  },
  important: true,
  variants: {
    opacity: ['responsive', 'hover', 'focus'],
    visibility: ['responsive', 'hover', 'focus'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    borderStyle: ['responsive', 'hover', 'focus'],
    fontWeight: ['hover', 'focus']
  },
  plugins: [
    plugin(function({ addBase, config }) {
      addBase({
        // 'h1': { fontSize: config('theme.fontSize.2xl') },
        'h1, h2, h3, h4, h5, h6': {fontWeight: config('theme.fontWeight.bold')},
        '*, *::before, *::after': {borderStyle: config('theme.borderStyle.inherit')},
        'blockquote, dl, dd, h1, h2, h3, h4, h5, h6, figure, p, pre': {marginBottom: config('theme.margin.4')},
      })
    })
  ]
}