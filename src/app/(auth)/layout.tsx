import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between min-h-screen w-full px-30"
      style={{
        backgroundImage: "url('/background.png')",
        objectFit: 'cover',
      }}
    >
      <LeftCard />
      {children}
    </div>
  );
}

type IFeature = {
  icon: string;
  title: string;
  description: string;
  size: number;
};

function LeftCard() {
  const features: IFeature[] = [
    {
      icon: '/kanban.png',
      title: 'Kanban Boards',
      description: 'Organize tasks visually and clearly.',
      size: 40,
    },
    {
      icon: '/partners.png',
      title: 'Team Collaboration',
      description: 'Work together in real time.',
      size: 35,
    },
    {
      icon: '/analytics.png',
      title: 'Smart Analytics',
      description: 'Track progress and make better decisions',
      size: 35,
    },
  ];

  return (
    <div className="w-120">
      {/* <Image src="/background.png" alt="Background" width={600} height={800} /> */}
      <div>
        <Image src="/kardio-lockup.png" alt="Logo" width={150} height={70} />
      </div>
      <div className="mt-14">
        <Badge className="bg-primary/10 text-primary font-semibold px-4 py-2.5">
          Built for teams that move fast
        </Badge>
      </div>
      <div className="mt-4 mb-14">
        <p className="text-5xl font-bold">
          Manage every <br /> task{' '}
          <span className="text-primary text-4xl italic font-bold font-pettit-formal-script">
            effortlessly.
          </span>
        </p>
        <p className="mt-1">
          Kardio helps you organize work, track progress, <br /> and get more
          done - together.
        </p>
      </div>
      <div>
        <ul className="mt-10 flex flex-col gap-8">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={feature.size}
                  height={feature.size}
                />
              </div>
              <div>
                <p className="font-semibold">{feature.title}</p>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
