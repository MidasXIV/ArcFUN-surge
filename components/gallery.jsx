/* eslint-disable no-nested-ternary */
import cn from "classnames";
/**
 * Image Gallery Component
 * Used in Level Layout
 * Gallery Configurations:
 * when number of items is 3 :
 * * Order- 2,3,1
 * * shows 3rd image on top, 1st image on bottom, 2nd imgage on right
 *
 * * Order- 1,3,2
 * * shows 3rd image on bottom, 1st image on top, 2nd imgage on right
 *
 * * Order- 2,1,3
 * * shows 3rd image on bottom, 1st image on top, 2nd imgage on Left
 */

const assignOrder = (item) => ({
  "order-1": item.order === 1,
  "order-2": item.order === 2,
  "order-3": item.order === 3,
  "order-4": item.order === 4
});

const ImageGallerySwitch = ({ items }) => {
  switch (items.length) {
    case 1:
      return (
        <img
          className="max-w-xl rounded-lg"
          alt={items[0].alt}
          src={items[0].src}
        />
      );
    case 2:
      return (
        <div className="grid gap-x-4 grid-cols-2 grid-rows-1">
          <img
            className="max-w-md rounded-lg"
            alt={items[0].alt}
            src={items[0].src}
          />
          <img
            className="max-w-md rounded-lg"
            alt={items[1].alt}
            src={items[1].src}
          />
        </div>
      );
    case 3:
      return (
        <div className="mx-auto grid gap-4 grid-flow-col grid-cols-2 grid-rows-2">
          <img
            className={cn(
              "rounded-lg row-span-1 h-full object-cover",
              assignOrder(items[0])
            )}
            alt={items[0].alt}
            src={items[0].src}
          />
          <img
            className={cn(
              "rounded-lg row-span-2 h-full object-cover",
              assignOrder(items[1])
            )}
            alt={items[1].alt}
            src={items[1].src}
          />
          <img
            className={cn(
              "rounded-lg row-span-1 h-full object-cover",
              assignOrder(items[2])
            )}
            alt={items[2].alt}
            src={items[2].src}
          />
        </div>
      );
    case 4:
      return (
        <div className="mx-auto grid gap-2 grid-flow-col grid-cols-2 grid-rows-2">
          <img
            className={cn(
              "rounded-lg row-span-1 h-full object-cover",
              assignOrder(items[0])
            )}
            alt={items[0].alt}
            src={items[0].src}
          />
          <img
            className={cn(
              "rounded-lg row-span-1 h-full object-cover",
              assignOrder(items[1])
            )}
            alt={items[1].alt}
            src={items[1].src}
          />
          <img
            className={cn(
              "rounded-lg row-span-1 h-full object-cover",
              assignOrder(items[2])
            )}
            alt={items[2].alt}
            src={items[2].src}
          />
          <img
            className={cn(
              "rounded-lg row-span-1 h-full object-cover",
              assignOrder(items[3])
            )}
            alt={items[3].alt}
            src={items[3].src}
          />
        </div>);
    default:
      return <></>;
  }
};

const Gallery = ({ numberOfItems, items = [] }) => {
  console.log(items);
  return <ImageGallerySwitch items={items} />;
};

export default Gallery;
