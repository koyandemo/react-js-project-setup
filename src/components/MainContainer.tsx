import { cn } from '@/lib/utils';

export default function MainContainer({
  background = '#F8F8F8BF',
  className,
  children,
}: {
  background?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    //please don't use backdrop-blur for drag and drop
    // Please add a prop to add sticky if needed
    <div
      className={cn(
        `w-full h-[88vh] overflow-hidden shreScrollBar overflow-y-scroll rounded-[30px] px-[24px] py-[22px] select-none focus:outline-none`,
        className
      )}
      style={{ backgroundColor: background }}
    >
      {children}
    </div>
  );
}
