import localFont from 'next/font/local'

export const gotham = localFont({
  src: [
    {
      path: '../fonts/gotham/Gotham-Thin.otf', 
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/gotham/Gotham-Book.otf', 
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/gotham/Gotham-Medium.otf', 
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-gotham',
  display: 'swap',
});

export const inter = localFont({
  src: [
    {
      path: '../fonts/Inter/Inter_18pt-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/Inter/Inter_24pt-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Inter/Inter_24pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Inter/Inter_28pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Inter/Inter_28pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
}); 
