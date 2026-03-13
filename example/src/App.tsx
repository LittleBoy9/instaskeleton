import { useMemo, useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Input,
  Progress,
  Select,
  SelectItem,
  Slider,
  Snippet,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Textarea
} from '@heroui/react';
import { InstaSkeleton, withInstaSkeleton, type SkeletonNode } from 'instaskeleton';

type User = {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'away';
};

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  stock: number;
};

type Post = {
  id: number;
  author: string;
  content: string;
  likes: number;
  time: string;
};

type Notification = {
  id: number;
  title: string;
  desc: string;
  type: 'info' | 'success' | 'warning';
};

const mockUsers: User[] = [
  { id: 1, name: 'Ava Smith', role: 'Product Designer', status: 'active' },
  { id: 2, name: 'Noah Kim', role: 'Frontend Engineer', status: 'away' },
  { id: 3, name: 'Liam Patel', role: 'Data Analyst', status: 'active' },
  { id: 4, name: 'Maya Chen', role: 'Backend Engineer', status: 'active' }
];

const mockProducts: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: '$89.00', category: 'Audio', stock: 42 },
  { id: 2, name: 'Mechanical Keyboard', price: '$149.00', category: 'Peripherals', stock: 18 },
  { id: 3, name: 'USB-C Hub', price: '$59.00', category: 'Accessories', stock: 73 },
  { id: 4, name: '4K Monitor', price: '$399.00', category: 'Displays', stock: 5 }
];

const mockPosts: Post[] = [
  {
    id: 1,
    author: 'Sarah',
    content: 'Shipped a zero-DOM-scan skeleton loader. The bundle stayed tiny and the loading transition feels instant.',
    likes: 24,
    time: '2h ago'
  },
  {
    id: 2,
    author: 'Alex',
    content: 'Inference from the JSX tree is good enough for feeds, settings forms, and tables. Manual schema still wins for exact layout.',
    likes: 18,
    time: '5h ago'
  }
];

const mockNotifications: Notification[] = [
  { id: 1, title: 'Deploy successful', desc: 'v0.1.0 published and docs synced.', type: 'success' },
  { id: 2, title: 'CI warning', desc: 'Example build grew by 8 KB after adding the showcase.', type: 'warning' },
  { id: 3, title: 'Contributor joined', desc: 'maya-chen opened a perf-focused PR.', type: 'info' }
];

const categories = [
  { key: 'ui', label: 'UI' },
  { key: 'api', label: 'API' },
  { key: 'infra', label: 'Infra' }
];

function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-row items-center gap-4">
        <Avatar name={user.name} radius="full" color="primary" />
        <div className="flex flex-col gap-1">
          <p className="font-semibold leading-none">{user.name}</p>
          <p className="text-small text-default-500">{user.role}</p>
        </div>
        <Chip className="ml-auto" color={user.status === 'active' ? 'success' : 'warning'} size="sm" variant="flat">
          {user.status}
        </Chip>
      </CardBody>
    </Card>
  );
}

function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <Card className="w-full">
      <CardBody className="gap-1">
        <p className="text-small text-default-500">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          <span className="text-small text-success">{change}</span>
        </div>
      </CardBody>
    </Card>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-full">
      <CardBody className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-semibold">{product.name}</h4>
          <Chip size="sm" variant="flat">
            {product.category}
          </Chip>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{product.price}</span>
          <span className="text-small text-default-500">{product.stock} in stock</span>
        </div>
        <Progress
          value={product.stock}
          maxValue={100}
          size="sm"
          color={product.stock < 10 ? 'danger' : product.stock < 30 ? 'warning' : 'success'}
        />
      </CardBody>
    </Card>
  );
}

function SocialPost({ post }: { post: Post }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar name={post.author} size="sm" />
        <div className="flex flex-col">
          <p className="font-semibold text-small">{post.author}</p>
          <p className="text-tiny text-default-400">{post.time}</p>
        </div>
      </CardHeader>
      <CardBody className="py-0">
        <p className="text-default-700">{post.content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <Button size="sm" variant="light">
          ♥ {post.likes}
        </Button>
        <Button size="sm" variant="light">
          Reply
        </Button>
        <Button size="sm" variant="light">
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const colorMap = { info: 'primary', success: 'success', warning: 'warning' } as const;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-default-200 p-3">
      <div
        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ background: notification.type === 'success' ? '#17c964' : notification.type === 'warning' ? '#f5a524' : '#006fee' }}
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-small font-medium">{notification.title}</p>
        <p className="text-tiny text-default-400">{notification.desc}</p>
      </div>
      <Chip size="sm" color={colorMap[notification.type]} variant="dot" className="ml-auto shrink-0">
        {notification.type}
      </Chip>
    </div>
  );
}

function ChatMessage({ name, text, isSelf }: { name: string; text: string; isSelf?: boolean }) {
  return (
    <div className={`flex gap-3 ${isSelf ? 'flex-row-reverse' : ''}`}>
      <Avatar name={name} size="sm" />
      <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isSelf ? 'bg-primary text-white' : 'bg-default-100'}`}>
        <p className="text-small">{text}</p>
      </div>
    </div>
  );
}

function PricingTier({ name, price, features }: { name: string; price: string; features: string[] }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center pb-0">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-3xl font-extrabold text-primary">{price}</p>
        <p className="text-tiny text-default-400">per month</p>
      </CardHeader>
      <CardBody>
        <ul className="flex flex-col gap-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-small">
              <span className="text-success">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>
        <Button fullWidth color="primary" variant="flat">
          Choose Plan
        </Button>
      </CardFooter>
    </Card>
  );
}

function FileItem({ name, size, type }: { name: string; size: string; type: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-default-200 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-tiny font-bold text-primary">
        {type}
      </div>
      <div className="flex flex-col">
        <p className="text-small font-medium">{name}</p>
        <p className="text-tiny text-default-400">{size}</p>
      </div>
      <Button size="sm" variant="light" className="ml-auto">
        Download
      </Button>
    </div>
  );
}

function SettingsPanel() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start gap-1">
        <h3 className="text-base font-semibold">Workspace Preferences</h3>
        <p className="text-small text-default-500">A mixed layout with toggles, text inputs, and progress.</p>
      </CardHeader>
      <CardBody className="gap-4">
        <div className="flex items-center gap-3">
          <AvatarGroup isBordered max={4}>
            <Avatar name="Ava" />
            <Avatar name="Noah" />
            <Avatar name="Maya" />
            <Avatar name="Liam" />
          </AvatarGroup>
          <div>
            <p className="font-medium">Core team</p>
            <p className="text-small text-default-500">4 collaborators online</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Workspace name" defaultValue="instaskeleton" />
          <Select label="Team" selectedKeys={new Set(['ui'])}>
            {categories.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
        <Textarea label="Release notes" defaultValue="Show inference demo, manual schema mirror, and HOC examples." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Switch defaultSelected>Enable cacheKey</Switch>
          <Switch defaultSelected>Respect reduced motion</Switch>
        </div>
        <Slider
          label="Shimmer duration"
          defaultValue={60}
          className="max-w-full"
        />
        <Progress value={78} label="Migration progress" showValueLabel />
      </CardBody>
    </Card>
  );
}

function Section({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-white/60 bg-white/85 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur">
      <CardHeader className="flex-col items-start gap-1 border-b border-default-100/80">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-small text-default-500">{subtitle}</p>
      </CardHeader>
      <CardBody className="grid gap-4">{children}</CardBody>
    </Card>
  );
}

function ExampleTile({
  title,
  mode,
  children
}: {
  title: string;
  mode: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-default-200/70 bg-content1/80">
      <CardHeader className="flex items-center justify-between gap-3">
        <p className="font-medium">{title}</p>
        <Chip size="sm" variant="flat">
          {mode}
        </Chip>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

function AnatomyCard({
  title,
  description,
  code,
  skeleton,
  children,
  animation
}: {
  title: string;
  description: string;
  code: string;
  skeleton: SkeletonNode | SkeletonNode[];
  children: React.ReactNode;
  animation: 'shimmer' | 'pulse' | 'none';
}) {
  return (
    <Card className="border border-default-200/70 bg-content1/80">
      <CardHeader className="flex flex-col items-start gap-1">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-small text-default-500">{description}</p>
      </CardHeader>
      <CardBody className="grid gap-4 lg:grid-cols-[1fr_1fr_280px]">
        <div className="rounded-2xl border border-dashed border-default-200 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-default-400">Live component</p>
          {children}
        </div>
        <div className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/40 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-primary-500">Skeleton mirror</p>
          <InstaSkeleton loading={true} schema={skeleton} infer={false} animation={animation}>
            <div />
          </InstaSkeleton>
        </div>
        <Snippet hideSymbol className="h-fit whitespace-pre-wrap rounded-2xl border border-default-200 bg-default-50 p-3 text-xs">
          {code}
        </Snippet>
      </CardBody>
    </Card>
  );
}

const profileMirrorSchema: SkeletonNode[] = [
  {
    type: 'group',
    gap: '0.75rem',
    children: [
      { type: 'circle', width: '3rem', height: '3rem' },
      { type: 'line', width: '42%' },
      { type: 'line', width: '26%' }
    ]
  }
];

const dashboardSchema: SkeletonNode[] = [
  { type: 'line', width: '35%', height: '0.75rem' },
  { type: 'rect', height: '3rem', radius: '0.75rem' },
  { type: 'line', width: '20%', height: '0.65rem' }
];

const articleSchema: SkeletonNode[] = [
  { type: 'rect', width: '100%', height: '10rem', radius: '1rem' },
  { type: 'line', width: '68%' },
  { type: 'line', width: '92%' },
  { type: 'line', width: '40%' }
];

const chatSchema: SkeletonNode[] = [
  {
    type: 'group',
    children: [
      { type: 'circle', width: '2rem', height: '2rem' },
      { type: 'rect', width: '60%', height: '2.6rem', radius: '1rem' }
    ]
  },
  {
    type: 'group',
    children: [
      { type: 'rect', width: '45%', height: '2rem', radius: '1rem' },
      { type: 'circle', width: '2rem', height: '2rem' }
    ]
  },
  {
    type: 'group',
    children: [
      { type: 'circle', width: '2rem', height: '2rem' },
      { type: 'rect', width: '72%', height: '3rem', radius: '1rem' }
    ]
  }
];

const settingsSchema: SkeletonNode[] = [
  { type: 'line', width: '32%' },
  { type: 'line', width: '54%' },
  { type: 'group', children: [{ type: 'circle', width: '2.5rem', height: '2.5rem' }, { type: 'line', width: '34%' }] },
  { type: 'rect', height: '3rem', radius: '0.75rem' },
  { type: 'rect', height: '3rem', radius: '0.75rem' },
  { type: 'rect', height: '5.5rem', radius: '1rem' },
  { type: 'rect', height: '2.2rem', radius: '999px' },
  { type: 'line', width: '26%' }
];

const ProductRowWithSkeleton = withInstaSkeleton(
  ({ title, price }: { title: string; price: string }) => (
    <Card className="w-full">
      <CardBody className="flex flex-row items-center justify-between">
        <span className="text-small text-default-600">{title}</span>
        <strong>{price}</strong>
      </CardBody>
    </Card>
  ),
  {
    skeleton: [{ type: 'group', children: [{ type: 'line', width: '55%' }, { type: 'line', width: '18%' }] }],
    infer: false,
    cacheKey: 'product-row'
  }
);

const StatWithSkeleton = withInstaSkeleton(StatCard, {
  skeleton: dashboardSchema,
  infer: false,
  cacheKey: 'stat-card'
});

const NotificationWithSkeleton = withInstaSkeleton(NotificationItem, {
  infer: true,
  cacheKey: 'notification-hoc'
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState<'shimmer' | 'pulse' | 'none'>('shimmer');

  const users = useMemo(() => mockUsers, []);
  const products = useMemo(() => mockProducts, []);
  const posts = useMemo(() => mockPosts, []);
  const notifications = useMemo(() => mockNotifications, []);

  return (
    <main className="example-shell mx-auto grid min-h-screen w-full max-w-7xl gap-5 px-4 py-6 md:px-8 md:py-10">
      <section className="hero-panel overflow-hidden rounded-[2rem] border border-white/60 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="grid gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <Chip variant="flat" className="mb-3 bg-white/80 text-slate-700">
                  React skeleton showcase
                </Chip>
                <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl">
                  A proper example app for inference, manual schema, HOC, and inner-component shape matching.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                  Toggle loading, swap animation style, and compare live components with the skeleton structure they should map to.
                </p>
              </div>
              <Button color="primary" size="lg" onPress={() => setLoading((value) => !value)}>
                {loading ? 'Show Content' : 'Show Skeleton'}
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
              <Card className="border border-white/60 bg-white/88">
                <CardHeader className="flex-col items-start gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">Controls</p>
                    <h2 className="text-lg font-semibold text-slate-900">Interactive loading states</h2>
                  </div>
                  <Tabs selectedKey={animation} onSelectionChange={(key) => setAnimation(key as 'shimmer' | 'pulse' | 'none')} size="sm">
                    <Tab key="shimmer" title="Shimmer" />
                    <Tab key="pulse" title="Pulse" />
                    <Tab key="none" title="None" />
                  </Tabs>
                </CardHeader>
                <CardBody className="grid gap-4 md:grid-cols-2">
                  <Input label="Package" value="instaskeleton" readOnly />
                  <Select label="Scenario focus" selectedKeys={new Set(['ui'])}>
                    {categories.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </Select>
                  <Snippet hideSymbol className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-xs text-slate-100">
                    {"<InstaSkeleton loading={loading} infer cacheKey=\"product-card-v1\">"}
                  </Snippet>
                </CardBody>
              </Card>

              <div className="grid gap-4">
                <StatCard label="Sections" value="14" change="all scenarios" />
                <StatCard label="Component patterns" value="10+" change="cards, feeds, forms" />
                <StatCard label="Skeleton modes" value="3" change="infer, manual, HOC" />
              </div>
            </div>
          </div>

          <Card className="border border-white/60 bg-slate-950 text-white">
            <CardHeader className="flex-col items-start gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">What this page proves</p>
              <h2 className="text-2xl font-bold tracking-tight">The skeleton should resemble the inner component, not just generic bars.</h2>
            </CardHeader>
            <CardBody className="gap-4 text-sm text-slate-300">
              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Inference mode</p>
                  <p className="mt-1">Useful when you want zero schema work and a safe approximation from the React tree.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Manual schema</p>
                  <p className="mt-1">Use this when card anatomy matters and you want the placeholder to mirror the actual component structure.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">HOC wrappers</p>
                  <p className="mt-1">Preconfigure common skeletons once, then hand out a simple `loading` prop to the rest of the app.</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <Section title="Scenario Gallery" subtitle="Broad coverage for common loading states in product UIs.">
        <div className="grid gap-4 xl:grid-cols-2">
          <ExampleTile title="Team Profiles" mode="infer + cacheKey">
            <InstaSkeleton loading={loading} infer cacheKey="profiles" animation={animation}>
              <div className="grid gap-3">
                {users.map((user) => (
                  <ProfileCard key={user.id} user={user} />
                ))}
              </div>
            </InstaSkeleton>
          </ExampleTile>

          <ExampleTile title="Product Grid" mode="infer + nested components">
            <InstaSkeleton loading={loading} infer cacheKey="products" animation={animation}>
              <div className="grid gap-3 sm:grid-cols-2">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </InstaSkeleton>
          </ExampleTile>

          <ExampleTile title="Social Feed" mode="infer + deep JSX">
            <InstaSkeleton loading={loading} infer cacheKey="feed" animation={animation}>
              <div className="grid gap-3">
                {posts.map((post) => (
                  <SocialPost key={post.id} post={post} />
                ))}
              </div>
            </InstaSkeleton>
          </ExampleTile>

          <ExampleTile title="Workspace Settings" mode="infer + mixed native and HeroUI">
            <InstaSkeleton loading={loading} infer cacheKey="workspace-settings" animation={animation}>
              <SettingsPanel />
            </InstaSkeleton>
          </ExampleTile>
        </div>
      </Section>

      <Section title="Data Surfaces" subtitle="Lists, files, and tables are common spots where loaders need to feel structurally correct.">
        <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
          <ExampleTile title="File List" mode="infer">
            <InstaSkeleton loading={loading} infer cacheKey="files" animation={animation}>
              <div className="grid gap-2">
                <FileItem name="instaskeleton-0.1.0.tgz" size="4.2 KB" type="TGZ" />
                <FileItem name="README.md" size="2.8 KB" type="MD" />
                <FileItem name="core.tsx" size="5.1 KB" type="TSX" />
                <FileItem name="styles.css" size="1.2 KB" type="CSS" />
              </div>
            </InstaSkeleton>
          </ExampleTile>

          <ExampleTile title="Table Layout" mode="infer">
            <InstaSkeleton loading={loading} infer cacheKey="table" animation={animation}>
              <Table aria-label="Product table">
                <TableHeader>
                  <TableColumn>PRODUCT</TableColumn>
                  <TableColumn>CATEGORY</TableColumn>
                  <TableColumn>PRICE</TableColumn>
                  <TableColumn>STOCK</TableColumn>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </InstaSkeleton>
          </ExampleTile>
        </div>
      </Section>

      <Section title="Manual Schema Mirrors" subtitle="These sections are for the exact case you asked for: skeletons shaped like the inner component.">
        <div className="grid gap-4">
          <AnatomyCard
            title="Profile row mirror"
            description="Circle for avatar, then two lines for name and role."
            animation={animation}
            skeleton={profileMirrorSchema}
            code={`const profileSchema = [
  {
    type: 'group',
    children: [
      { type: 'circle', width: '3rem', height: '3rem' },
      { type: 'line', width: '42%' },
      { type: 'line', width: '26%' }
    ]
  }
];`}
          >
            <ProfileCard user={users[0]} />
          </AnatomyCard>

          <AnatomyCard
            title="Article card mirror"
            description="Large media block, then title and supporting copy."
            animation={animation}
            skeleton={articleSchema}
            code={`const articleSchema = [
  { type: 'rect', height: '10rem', radius: '1rem' },
  { type: 'line', width: '68%' },
  { type: 'line', width: '92%' },
  { type: 'line', width: '40%' }
];`}
          >
            <Card className="w-full">
              <CardBody className="gap-3">
                <img src="https://picsum.photos/seed/insta-article/800/320" alt="cover" className="h-40 w-full rounded-2xl object-cover" />
                <h3 className="text-lg font-bold">Building a no-DOM-scan skeleton library</h3>
                <p className="text-default-500">
                  Manual schema is the right tool when a post card has a strong visual rhythm and you want the loading state to respect it.
                </p>
                <p className="text-small text-default-400">March 13, 2026 · 5 min read</p>
              </CardBody>
            </Card>
          </AnatomyCard>

          <AnatomyCard
            title="Settings panel mirror"
            description="Rect controls and lines arranged to suggest the internal form layout."
            animation={animation}
            skeleton={settingsSchema}
            code={`const settingsSchema = [
  { type: 'line', width: '32%' },
  { type: 'line', width: '54%' },
  { type: 'group', children: [...] },
  { type: 'rect', height: '3rem', radius: '0.75rem' },
  { type: 'rect', height: '5.5rem', radius: '1rem' }
];`}
          >
            <SettingsPanel />
          </AnatomyCard>
        </div>
      </Section>

      <Section title="Conversation and Pricing" subtitle="Two more scenario shapes that tend to look wrong when the skeleton is too generic.">
        <div className="grid gap-4 xl:grid-cols-2">
          <ExampleTile title="Chat thread" mode="manual schema">
            <InstaSkeleton loading={loading} schema={chatSchema} infer={false} animation={animation}>
              <div className="flex flex-col gap-3">
                <ChatMessage name="Alice" text="Have you mapped the loader to the real message layout?" />
                <ChatMessage name="You" text="Yes. The skeleton now reflects avatar placement and bubble width." isSelf />
                <ChatMessage name="Alice" text="That is the right level of fidelity for messaging UI." />
              </div>
            </InstaSkeleton>
          </ExampleTile>

          <ExampleTile title="Pricing cards" mode="infer">
            <InstaSkeleton loading={loading} infer cacheKey="pricing" animation={animation}>
              <div className="grid gap-4 sm:grid-cols-3">
                <PricingTier name="Starter" price="$0" features={['1 project', '100 skeletons', 'Community support']} />
                <PricingTier name="Pro" price="$19" features={['Unlimited projects', 'Custom themes', 'Priority support', 'Analytics']} />
                <PricingTier name="Enterprise" price="$99" features={['Everything in Pro', 'SSO', 'SLA', 'Custom integrations']} />
              </div>
            </InstaSkeleton>
          </ExampleTile>
        </div>
      </Section>

      <Section title="HOC Wrappers" subtitle="The preconfigured pattern for teams that want consistent loading APIs.">
        <div className="grid gap-4">
          <div>
            <p className="mb-2 text-sm text-default-500">Product rows with a shared manual schema:</p>
            <div className="grid gap-2">
              {products.slice(0, 3).map((product) => (
                <ProductRowWithSkeleton key={product.id} loading={loading} title={product.name} price={product.price} />
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <p className="mb-2 text-sm text-default-500">Stat cards wrapped once and reused everywhere:</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatWithSkeleton loading={loading} label="Downloads" value="12.4k" change="+23%" />
              <StatWithSkeleton loading={loading} label="Stars" value="847" change="+12%" />
              <StatWithSkeleton loading={loading} label="Bundle Size" value="1.2kB" change="-5%" />
            </div>
          </div>

          <Divider />

          <div>
            <p className="mb-2 text-sm text-default-500">Notifications inferred through the wrapper:</p>
            <div className="grid gap-2">
              {notifications.map((notification) => (
                <NotificationWithSkeleton key={notification.id} loading={loading} notification={notification} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Primitives and Options" subtitle="Reference blocks for node types, animation modes, and inference controls.">
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <Card className="border border-default-200/70 bg-content1/80">
            <CardHeader>
              <p className="font-medium">All four node types</p>
            </CardHeader>
            <CardBody className="grid gap-4 sm:grid-cols-2">
              <InstaSkeleton
                loading={true}
                schema={[
                  { type: 'line', width: '100%' },
                  { type: 'line', width: '76%' },
                  { type: 'line', width: '48%' }
                ]}
                infer={false}
                animation={animation}
              >
                <span />
              </InstaSkeleton>
              <InstaSkeleton
                loading={true}
                schema={[
                  { type: 'rect', height: '4rem', radius: '0.8rem' },
                  { type: 'rect', height: '2.5rem', radius: '0.8rem' }
                ]}
                infer={false}
                animation={animation}
              >
                <span />
              </InstaSkeleton>
              <InstaSkeleton
                loading={true}
                schema={[
                  { type: 'circle', width: '3rem', height: '3rem' },
                  { type: 'circle', width: '2rem', height: '2rem' }
                ]}
                infer={false}
                animation={animation}
              >
                <span />
              </InstaSkeleton>
              <InstaSkeleton
                loading={true}
                schema={[
                  {
                    type: 'group',
                    gap: '0.75rem',
                    children: [
                      { type: 'circle', width: '2.4rem', height: '2.4rem' },
                      { type: 'line', width: '60%' },
                      { type: 'line', width: '35%' }
                    ]
                  }
                ]}
                infer={false}
                animation={animation}
              >
                <span />
              </InstaSkeleton>
            </CardBody>
          </Card>

          <Card className="border border-default-200/70 bg-content1/80">
            <CardHeader>
              <p className="font-medium">Animation comparison</p>
            </CardHeader>
            <CardBody className="grid gap-4 sm:grid-cols-3">
              {(['shimmer', 'pulse', 'none'] as const).map((mode) => (
                <div key={mode} className="rounded-2xl border border-default-200 p-3">
                  <p className="mb-3 text-sm font-medium capitalize">{mode}</p>
                  <InstaSkeleton
                    loading={true}
                    schema={[
                      { type: 'circle', width: '2.5rem', height: '2.5rem' },
                      { type: 'line', width: '82%' },
                      { type: 'line', width: '56%' },
                      { type: 'rect', height: '3rem', radius: '0.75rem' }
                    ]}
                    infer={false}
                    animation={mode}
                  >
                    <span />
                  </InstaSkeleton>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="border border-default-200/70 bg-content1/80">
            <CardHeader>
              <p className="font-medium">Custom inferOptions</p>
            </CardHeader>
            <CardBody className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-default-200 p-3">
                <p className="mb-3 text-sm font-medium">Default depth</p>
                <InstaSkeleton loading={loading} infer cacheKey="infer-default-depth" animation={animation}>
                  <div>
                    <div>
                      <div>
                        <p>Level 1</p>
                        <p>Level 2</p>
                        <p>Level 3</p>
                      </div>
                    </div>
                  </div>
                </InstaSkeleton>
              </div>
              <div className="rounded-2xl border border-default-200 p-3">
                <p className="mb-3 text-sm font-medium">maxDepth=2, large text</p>
                <InstaSkeleton
                  loading={loading}
                  infer
                  cacheKey="infer-custom-depth"
                  animation={animation}
                  inferOptions={{ maxDepth: 2, textLineHeight: '1.5rem' }}
                >
                  <div>
                    <div>
                      <div>
                        <p>Level 1</p>
                        <p>Level 2</p>
                        <p>Level 3</p>
                      </div>
                    </div>
                  </div>
                </InstaSkeleton>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-default-200/70 bg-content1/80">
            <CardHeader>
              <p className="font-medium">Single-node shorthand</p>
            </CardHeader>
            <CardBody className="grid gap-3 sm:grid-cols-3">
              <InstaSkeleton loading={loading} schema={{ type: 'line', width: '80%' }} infer={false} animation={animation}>
                <p>Single line skeleton</p>
              </InstaSkeleton>
              <InstaSkeleton loading={loading} schema={{ type: 'rect', height: '4rem', radius: '1rem' }} infer={false} animation={animation}>
                <div className="rounded-xl bg-primary-50 p-4 text-center">Rounded rect</div>
              </InstaSkeleton>
              <InstaSkeleton loading={loading} schema={{ type: 'circle', width: '4rem', height: '4rem' }} infer={false} animation={animation}>
                <Avatar name="X" size="lg" />
              </InstaSkeleton>
            </CardBody>
          </Card>
        </div>
      </Section>
    </main>
  );
}
