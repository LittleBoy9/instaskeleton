import { useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Progress,
  Select,
  SelectItem,
  Slider,
  Switch,
  Tab,
  Tabs,
  Textarea,
} from '@heroui/react';
import { InstaSkeleton, withInstaSkeleton, type SkeletonNode } from 'instaskeleton';

// Mock Data
const mockUsers = [
  { id: 1, name: 'Ava Smith', role: 'Product Designer', status: 'active' as const },
  { id: 2, name: 'Noah Kim', role: 'Frontend Engineer', status: 'away' as const },
  { id: 3, name: 'Liam Patel', role: 'Data Analyst', status: 'active' as const },
];

const mockProducts = [
  { id: 1, name: 'Wireless Headphones', price: '$89.00', category: 'Audio', stock: 42 },
  { id: 2, name: 'Mechanical Keyboard', price: '$149.00', category: 'Peripherals', stock: 18 },
];

const mockPosts = [
  { id: 1, author: 'Sarah', content: 'Shipped a zero-DOM-scan skeleton loader. The bundle stayed tiny.', likes: 24, time: '2h' },
  { id: 2, author: 'Alex', content: 'Inference from JSX is perfect for feeds. Manual schema for exact layouts.', likes: 18, time: '5h' },
];

const mockTableRows = [
  { id: 'INV-001', customer: 'Acme Corp', amount: '$2,400.00', status: 'Paid', date: 'Mar 12' },
  { id: 'INV-002', customer: 'Globex Inc', amount: '$1,850.00', status: 'Pending', date: 'Mar 11' },
  { id: 'INV-003', customer: 'Initech', amount: '$3,200.00', status: 'Paid', date: 'Mar 10' },
  { id: 'INV-004', customer: 'Umbrella Ltd', amount: '$960.00', status: 'Overdue', date: 'Mar 08' },
];

const mockArticles = [
  {
    id: 1,
    title: 'Building Performant Skeleton Loaders',
    excerpt: 'Why zero-DOM-scan matters for bundle size and runtime performance in modern React apps.',
    author: 'Sounak Das',
    readTime: '5 min',
    tag: 'Performance',
  },
  {
    id: 2,
    title: 'Manual Schema vs Inference',
    excerpt: 'When to use heuristic inference and when to reach for manual skeleton schemas.',
    author: 'Ava Smith',
    readTime: '3 min',
    tag: 'Guide',
  },
];

// Demo Section Component with individual loading toggle and code preview
function DemoSection({
  title,
  description,
  mode,
  code,
  children,
}: {
  title: string;
  description: string;
  mode: string;
  code: string;
  children: (loading: boolean, animation: 'shimmer' | 'pulse' | 'none') => React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState<'shimmer' | 'pulse' | 'none'>('shimmer');
  const [showCode, setShowCode] = useState(false);

  return (
    <Card className="overflow-hidden border border-default-200 bg-white shadow-sm">
      <CardHeader className="flex flex-col gap-3 border-b border-default-100 bg-default-50/50 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Chip size="sm" variant="flat" color="primary">{mode}</Chip>
          </div>
          <p className="mt-1 text-sm text-default-500">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs
            size="sm"
            selectedKey={animation}
            onSelectionChange={(k) => setAnimation(k as 'shimmer' | 'pulse' | 'none')}
            classNames={{ tabList: 'bg-default-100' }}
          >
            <Tab key="shimmer" title="Shimmer" />
            <Tab key="pulse" title="Pulse" />
            <Tab key="none" title="None" />
          </Tabs>
          <Button
            size="sm"
            color={loading ? 'primary' : 'default'}
            variant={loading ? 'solid' : 'bordered'}
            onPress={() => setLoading(!loading)}
          >
            {loading ? 'Loading' : 'Loaded'}
          </Button>
        </div>
      </CardHeader>
      <CardBody className="p-6">
        <div className={`rounded-xl border-2 border-dashed p-4 ${loading ? 'border-primary-200 bg-primary-50/30' : 'border-success-200 bg-success-50/30'}`}>
          <p className={`mb-4 text-xs font-semibold uppercase tracking-widest ${loading ? 'text-primary-600' : 'text-success-600'}`}>
            {loading ? 'Skeleton State' : 'Loaded Content'}
          </p>
          {children(loading, animation)}
        </div>
      </CardBody>
      <div className="border-t border-default-100">
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex w-full items-center justify-between px-6 py-3 text-left text-xs font-medium text-default-500 transition-colors hover:bg-default-50"
        >
          <span>{showCode ? 'Hide Code' : 'View Code'}</span>
          <svg
            className={`h-4 w-4 transition-transform ${showCode ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showCode && (
          <div className="border-t border-default-100 bg-[#1e1e1e] px-6 py-4">
            <pre className="overflow-x-auto text-[13px] leading-relaxed">
              <code className="text-[#d4d4d4]">{code}</code>
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
}

// UI Components
function ProfileCard({ user }: { user: (typeof mockUsers)[0] }) {
  return (
    <Card>
      <CardBody className="flex flex-row items-center gap-4">
        <Avatar name={user.name} radius="full" color="primary" />
        <div className="flex-1">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-default-500">{user.role}</p>
        </div>
        <Chip color={user.status === 'active' ? 'success' : 'warning'} size="sm" variant="flat">
          {user.status}
        </Chip>
      </CardBody>
    </Card>
  );
}

function ProductCard({ product }: { product: (typeof mockProducts)[0] }) {
  return (
    <Card>
      <CardBody className="gap-3">
        <div className="flex justify-between">
          <h4 className="font-semibold">{product.name}</h4>
          <Chip size="sm" variant="flat">{product.category}</Chip>
        </div>
        <div className="flex justify-between">
          <span className="text-xl font-bold text-primary">{product.price}</span>
          <span className="text-sm text-default-500">{product.stock} in stock</span>
        </div>
        <Progress value={product.stock} maxValue={100} size="sm" color={product.stock < 20 ? 'warning' : 'success'} />
      </CardBody>
    </Card>
  );
}

function SocialPost({ post }: { post: (typeof mockPosts)[0] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar name={post.author} size="sm" />
        <div>
          <p className="text-sm font-semibold">{post.author}</p>
          <p className="text-xs text-default-400">{post.time}</p>
        </div>
      </CardHeader>
      <CardBody className="py-0">
        <p className="text-default-700">{post.content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <Button size="sm" variant="light">&#9829; {post.likes}</Button>
        <Button size="sm" variant="light">Reply</Button>
      </CardFooter>
    </Card>
  );
}

function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <Card>
      <CardBody>
        <p className="text-sm text-default-500">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          <span className="text-sm text-success">{change}</span>
        </div>
      </CardBody>
    </Card>
  );
}

function ChatMessage({ name, text, isSelf }: { name: string; text: string; isSelf?: boolean }) {
  return (
    <div className={`flex gap-3 ${isSelf ? 'flex-row-reverse' : ''}`}>
      <Avatar name={name} size="sm" />
      <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${isSelf ? 'bg-primary text-white' : 'bg-default-100'}`}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

function PricingCard({ name, price, features }: { name: string; price: string; features: string[] }) {
  return (
    <Card>
      <CardHeader className="flex-col items-center pb-0">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-3xl font-extrabold text-primary">{price}</p>
        <p className="text-xs text-default-400">per month</p>
      </CardHeader>
      <CardBody>
        <ul className="space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <span className="text-success">&#10003;</span>
              {f}
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>
        <Button fullWidth color="primary" variant="flat">Choose</Button>
      </CardFooter>
    </Card>
  );
}

function ArticleCard({ article }: { article: (typeof mockArticles)[0] }) {
  return (
    <Card>
      <CardHeader className="flex-col items-start gap-1 pb-0">
        <Chip size="sm" variant="flat" color="secondary">{article.tag}</Chip>
        <h4 className="text-base font-bold">{article.title}</h4>
      </CardHeader>
      <CardBody className="py-2">
        <p className="text-sm text-default-600">{article.excerpt}</p>
      </CardBody>
      <CardFooter className="justify-between">
        <div className="flex items-center gap-2">
          <Avatar name={article.author} size="sm" />
          <span className="text-xs text-default-500">{article.author}</span>
        </div>
        <span className="text-xs text-default-400">{article.readTime} read</span>
      </CardFooter>
    </Card>
  );
}

function DataTable({ rows }: { rows: typeof mockTableRows }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-default-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-default-200 bg-default-50">
            <th className="px-4 py-3 text-left font-semibold text-default-700">Invoice</th>
            <th className="px-4 py-3 text-left font-semibold text-default-700">Customer</th>
            <th className="px-4 py-3 text-left font-semibold text-default-700">Amount</th>
            <th className="px-4 py-3 text-left font-semibold text-default-700">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-default-700">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-default-100 last:border-0">
              <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
              <td className="px-4 py-3">{row.customer}</td>
              <td className="px-4 py-3 font-semibold">{row.amount}</td>
              <td className="px-4 py-3">
                <Chip
                  size="sm"
                  variant="flat"
                  color={row.status === 'Paid' ? 'success' : row.status === 'Pending' ? 'warning' : 'danger'}
                >
                  {row.status}
                </Chip>
              </td>
              <td className="px-4 py-3 text-default-500">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingsForm() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <AvatarGroup isBordered max={3}>
          <Avatar name="A" />
          <Avatar name="B" />
          <Avatar name="C" />
        </AvatarGroup>
        <div>
          <p className="font-medium">Team</p>
          <p className="text-sm text-default-500">3 members</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Project" defaultValue="instaskeleton" />
        <Select label="Type" defaultSelectedKeys={['ui']}>
          <SelectItem key="ui">UI Library</SelectItem>
          <SelectItem key="api">API</SelectItem>
        </Select>
      </div>
      <Textarea label="Description" defaultValue="Ultra-light skeleton loader" />
      <div className="flex gap-4">
        <Switch defaultSelected size="sm">Notifications</Switch>
        <Switch size="sm">Dark Mode</Switch>
      </div>
      <Slider label="Cache Size" defaultValue={60} size="sm" />
      <Progress value={75} label="Setup Progress" showValueLabel size="sm" />
    </div>
  );
}

// Schemas for manual mode

// Profile: avatar circle | name + role lines | status chip rect
const profileCardSchema: SkeletonNode = {
  type: 'group', direction: 'row', gap: '1rem', align: 'center', children: [
    { type: 'circle', width: '2.5rem', height: '2.5rem' },
    { type: 'group', gap: '0.25rem', children: [
      { type: 'line', width: '8rem', height: '0.9rem' },
      { type: 'line', width: '6rem', height: '0.75rem' },
    ]},
    { type: 'rect', width: '3.5rem', height: '1.5rem', radius: '999px' },
  ],
};
const profileSchema: SkeletonNode[] = [profileCardSchema, profileCardSchema, profileCardSchema];

// Product: title + chip row, price + stock row, progress bar
const productCardSchema: SkeletonNode = {
  type: 'group', gap: '0.75rem', children: [
    { type: 'group', direction: 'row', gap: '0.5rem', align: 'center', children: [
      { type: 'line', width: '60%', height: '1rem' },
      { type: 'rect', width: '4rem', height: '1.25rem', radius: '999px' },
    ]},
    { type: 'group', direction: 'row', gap: '0.5rem', align: 'center', children: [
      { type: 'line', width: '30%', height: '1.5rem' },
      { type: 'line', width: '25%' },
    ]},
    { type: 'rect', height: '0.5rem', radius: '999px' },
  ],
};
const productSchema: SkeletonNode[] = [productCardSchema, productCardSchema];

// Social post: avatar + name row, content lines, action buttons row
const socialPostSchema: SkeletonNode = {
  type: 'group', gap: '0.75rem', children: [
    { type: 'group', direction: 'row', gap: '0.75rem', align: 'center', children: [
      { type: 'circle', width: '2rem', height: '2rem' },
      { type: 'group', gap: '0.2rem', children: [
        { type: 'line', width: '5rem', height: '0.8rem' },
        { type: 'line', width: '2rem', height: '0.6rem' },
      ]},
    ]},
    { type: 'group', gap: '0.3rem', children: [
      { type: 'line', width: '100%' },
      { type: 'line', width: '80%' },
    ]},
    { type: 'group', direction: 'row', gap: '0.75rem', children: [
      { type: 'rect', width: '4rem', height: '2rem', radius: '0.5rem' },
      { type: 'rect', width: '3.5rem', height: '2rem', radius: '0.5rem' },
    ]},
  ],
};
const socialSchema: SkeletonNode[] = [socialPostSchema, socialPostSchema];

// Chat: horizontal rows with avatar + bubble, alternating sides
const chatSchema: SkeletonNode[] = [
  { type: 'group', direction: 'row', gap: '0.75rem', align: 'center', children: [
    { type: 'circle', width: '2rem', height: '2rem' },
    { type: 'rect', width: '65%', height: '2.5rem', radius: '1rem' },
  ]},
  { type: 'group', direction: 'row', gap: '0.75rem', align: 'center', children: [
    { type: 'rect', width: '50%', height: '2rem', radius: '1rem' },
    { type: 'circle', width: '2rem', height: '2rem' },
  ]},
  { type: 'group', direction: 'row', gap: '0.75rem', align: 'center', children: [
    { type: 'circle', width: '2rem', height: '2rem' },
    { type: 'rect', width: '75%', height: '3rem', radius: '1rem' },
  ]},
];

// Pricing: two card columns
const singlePricingCard: SkeletonNode = {
  type: 'group', gap: '0.75rem', children: [
    { type: 'line', width: '40%', height: '1.2rem' },
    { type: 'line', width: '50%', height: '2rem' },
    { type: 'line', width: '30%' },
    { type: 'group', gap: '0.5rem', children: [
      { type: 'line', width: '80%' },
      { type: 'line', width: '70%' },
      { type: 'line', width: '85%' },
    ]},
    { type: 'rect', height: '2.5rem', radius: '0.75rem' },
  ],
};
const pricingSchema: SkeletonNode[] = [singlePricingCard, singlePricingCard];

// Settings: team avatars, inputs, textarea, toggles, slider, progress
const settingsSchema: SkeletonNode[] = [
  { type: 'group', direction: 'row', gap: '0.75rem', align: 'center', children: [
    { type: 'circle', width: '2.5rem', height: '2.5rem' },
    { type: 'group', gap: '0.25rem', children: [
      { type: 'line', width: '40%' },
      { type: 'line', width: '25%' },
    ]},
  ]},
  { type: 'group', direction: 'row', gap: '0.75rem', children: [
    { type: 'rect', height: '3rem', radius: '0.75rem' },
    { type: 'rect', height: '3rem', radius: '0.75rem' },
  ]},
  { type: 'rect', height: '5rem', radius: '0.75rem' },
  { type: 'group', direction: 'row', gap: '1rem', children: [
    { type: 'rect', width: '6rem', height: '1.5rem', radius: '999px' },
    { type: 'rect', width: '5rem', height: '1.5rem', radius: '999px' },
  ]},
  { type: 'rect', height: '1.5rem', radius: '0.5rem' },
  { type: 'rect', height: '0.75rem', radius: '999px' },
];

// Data table: header + rows
const tableSchema: SkeletonNode[] = [
  { type: 'rect', height: '2.5rem', radius: '0.5rem' },
  { type: 'group', gap: '0.25rem', children: [
    { type: 'rect', height: '2.75rem', radius: '0' },
    { type: 'rect', height: '2.75rem', radius: '0' },
    { type: 'rect', height: '2.75rem', radius: '0' },
    { type: 'rect', height: '2.75rem', radius: '0' },
  ]},
];

// Article: two card columns
const singleArticleCard: SkeletonNode = {
  type: 'group', gap: '0.75rem', children: [
    { type: 'rect', width: '4rem', height: '1.25rem', radius: '999px' },
    { type: 'line', width: '85%', height: '1.1rem' },
    { type: 'group', gap: '0.25rem', children: [
      { type: 'line', width: '100%' },
      { type: 'line', width: '70%' },
    ]},
    { type: 'group', direction: 'row', gap: '0.5rem', align: 'center', children: [
      { type: 'circle', width: '2rem', height: '2rem' },
      { type: 'line', width: '30%' },
    ]},
  ],
};
const articleSchema: SkeletonNode[] = [singleArticleCard, singleArticleCard];

// HOC Example
const StatWithSkeleton = withInstaSkeleton(StatCard, {
  skeleton: [
    { type: 'line', width: '40%' },
    { type: 'group', gap: '0.5rem', children: [{ type: 'line', width: '60%', height: '1.75rem' }, { type: 'line', width: '20%' }] },
  ],
  infer: false,
  cacheKey: 'stat-card',
});

// Main App
export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-default-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <Chip variant="flat" color="primary" className="mb-4">~1.65 KB gzipped</Chip>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">instaskeleton</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Ultra-light React skeleton loader. Each section below has its own toggle — see exactly what loads.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button color="primary" size="lg" as="a" href="https://github.com/LittleBoy9/instaskeleton" target="_blank">GitHub</Button>
            <Button variant="bordered" size="lg" as="a" href="https://www.npmjs.com/package/instaskeleton" target="_blank">npm</Button>
          </div>
        </div>
      </header>

      {/* Demo Sections */}
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
        {/* Profile Cards - manual schema */}
        <DemoSection
          title="Profile Cards"
          description="Team member cards with avatar, name, role, and status chip"
          mode="manual schema"
          code={`const schema: SkeletonNode[] = [
  {
    type: 'group', direction: 'row', gap: '1rem', align: 'center',
    children: [
      { type: 'circle', width: '2.5rem', height: '2.5rem' },
      { type: 'group', gap: '0.25rem', children: [
        { type: 'line', width: '8rem', height: '0.9rem' },
        { type: 'line', width: '6rem', height: '0.75rem' },
      ]},
      { type: 'rect', width: '3.5rem', height: '1.5rem', radius: '999px' },
    ],
  },
];

<InstaSkeleton loading={loading} schema={schema} animation="shimmer">
  <ProfileCard user={user} />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={profileSchema} infer={false} animation={animation}>
              <div className="grid gap-3">
                {mockUsers.map((u) => <ProfileCard key={u.id} user={u} />)}
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Products - manual schema */}
        <DemoSection
          title="Product Grid"
          description="E-commerce cards with price and stock indicator"
          mode="manual schema"
          code={`const schema: SkeletonNode[] = [
  {
    type: 'group', gap: '0.75rem', children: [
      { type: 'group', direction: 'row', gap: '0.5rem', align: 'center',
        children: [
          { type: 'line', width: '60%', height: '1rem' },
          { type: 'rect', width: '4rem', height: '1.25rem', radius: '999px' },
        ]},
      { type: 'group', direction: 'row', gap: '0.5rem', align: 'center',
        children: [
          { type: 'line', width: '30%', height: '1.5rem' },
          { type: 'line', width: '25%' },
        ]},
      { type: 'rect', height: '0.5rem', radius: '999px' },
    ],
  },
];

<InstaSkeleton loading={loading} schema={schema} animation="shimmer">
  <ProductCard product={product} />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={productSchema} infer={false} animation={animation}>
              <div className="grid gap-3">
                {mockProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Social Feed - manual schema */}
        <DemoSection
          title="Social Feed"
          description="Social posts with author, content, and action buttons"
          mode="manual schema"
          code={`const schema: SkeletonNode[] = [
  {
    type: 'group', gap: '0.75rem', children: [
      { type: 'group', direction: 'row', gap: '0.75rem', align: 'center',
        children: [
          { type: 'circle', width: '2rem', height: '2rem' },
          { type: 'group', gap: '0.2rem', children: [
            { type: 'line', width: '5rem', height: '0.8rem' },
            { type: 'line', width: '2rem', height: '0.6rem' },
          ]},
        ]},
      { type: 'group', gap: '0.3rem', children: [
        { type: 'line', width: '100%' },
        { type: 'line', width: '80%' },
      ]},
      { type: 'group', direction: 'row', gap: '0.75rem', children: [
        { type: 'rect', width: '4rem', height: '2rem', radius: '0.5rem' },
        { type: 'rect', width: '3.5rem', height: '2rem', radius: '0.5rem' },
      ]},
    ],
  },
];

<InstaSkeleton loading={loading} schema={schema} animation="shimmer">
  <SocialPost post={post} />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={socialSchema} infer={false} animation={animation}>
              <div className="grid gap-3">
                {mockPosts.map((p) => <SocialPost key={p.id} post={p} />)}
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Article / Media Cards - manual schema */}
        <DemoSection
          title="Article Cards"
          description="Blog-style cards with tag, title, excerpt, and author"
          mode="manual schema"
          code={`const schema: SkeletonNode[] = [
  {
    type: 'group', gap: '0.75rem', children: [
      { type: 'rect', width: '4rem', height: '1.25rem', radius: '999px' },
      { type: 'line', width: '85%', height: '1.1rem' },
      { type: 'group', gap: '0.25rem', children: [
        { type: 'line', width: '100%' },
        { type: 'line', width: '70%' },
      ]},
      { type: 'group', direction: 'row', gap: '0.5rem', align: 'center',
        children: [
          { type: 'circle', width: '2rem', height: '2rem' },
          { type: 'line', width: '30%' },
        ]},
    ],
  },
];

<InstaSkeleton loading={loading} schema={schema} animation="shimmer">
  <ArticleCard article={article} />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={articleSchema} infer={false} animation={animation} className="grid! grid-cols-2! gap-4!">
              <div className="grid gap-4 sm:grid-cols-2">
                {mockArticles.map((a) => <ArticleCard key={a.id} article={a} />)}
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Data Table - manual schema */}
        <DemoSection
          title="Data Table"
          description="Tabular invoice data with status chips and amounts"
          mode="manual schema"
          code={`const schema: SkeletonNode[] = [
  { type: 'rect', height: '2.5rem', radius: '0.5rem' },
  { type: 'group', gap: '0.25rem', children: [
    { type: 'rect', height: '2.75rem', radius: '0' },
    { type: 'rect', height: '2.75rem', radius: '0' },
    { type: 'rect', height: '2.75rem', radius: '0' },
    { type: 'rect', height: '2.75rem', radius: '0' },
  ]},
];

<InstaSkeleton loading={loading} schema={schema} animation="shimmer">
  <DataTable rows={rows} />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={tableSchema} infer={false} animation={animation}>
              <DataTable rows={mockTableRows} />
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Chat - manual schema */}
        <DemoSection
          title="Chat Thread"
          description="Conversation with alternating message bubbles"
          mode="manual schema"
          code={`const schema: SkeletonNode[] = [
  { type: 'group', direction: 'row', gap: '0.75rem', align: 'center',
    children: [
      { type: 'circle', width: '2rem', height: '2rem' },
      { type: 'rect', width: '65%', height: '2.5rem', radius: '1rem' },
    ]},
  { type: 'group', direction: 'row', gap: '0.75rem', align: 'center',
    children: [
      { type: 'rect', width: '50%', height: '2rem', radius: '1rem' },
      { type: 'circle', width: '2rem', height: '2rem' },
    ]},
];

<InstaSkeleton loading={loading} schema={schema} animation="shimmer">
  <ChatThread messages={messages} />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={chatSchema} infer={false} animation={animation}>
              <div className="flex flex-col gap-4">
                <ChatMessage name="Alice" text="Have you tried the new skeleton library?" />
                <ChatMessage name="You" text="Yes, it's incredibly lightweight!" isSelf />
                <ChatMessage name="Alice" text="The manual schema feature is perfect for chat UIs." />
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Pricing - manual schema */}
        <DemoSection
          title="Pricing Cards"
          description="Pricing tiers with features and CTA button"
          mode="manual schema"
          code={`const cardSchema: SkeletonNode = {
  type: 'group', gap: '0.75rem', children: [
    { type: 'line', width: '40%', height: '1.2rem' },
    { type: 'line', width: '50%', height: '2rem' },
    { type: 'line', width: '30%' },
    { type: 'group', gap: '0.5rem', children: [
      { type: 'line', width: '80%' },
      { type: 'line', width: '70%' },
      { type: 'line', width: '85%' },
    ]},
    { type: 'rect', height: '2.5rem', radius: '0.75rem' },
  ],
};

<InstaSkeleton
  loading={loading}
  schema={[cardSchema, cardSchema]}
  className="grid grid-cols-2 gap-4"
  animation="shimmer"
>
  <PricingGrid />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={pricingSchema} infer={false} animation={animation} className="grid! grid-cols-2! gap-4!">
              <div className="grid gap-4 sm:grid-cols-2">
                <PricingCard name="Starter" price="$0" features={['1 project', 'Community support']} />
                <PricingCard name="Pro" price="$19" features={['Unlimited projects', 'Priority support', 'Analytics']} />
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Settings - manual schema */}
        <DemoSection
          title="Settings Panel"
          description="Complex form with inputs, toggles, sliders"
          mode="manual schema"
          code={`const schema: SkeletonNode[] = [
  { type: 'group', direction: 'row', gap: '0.75rem', align: 'center',
    children: [
      { type: 'circle', width: '2.5rem', height: '2.5rem' },
      { type: 'group', gap: '0.25rem', children: [
        { type: 'line', width: '40%' },
        { type: 'line', width: '25%' },
      ]},
    ]},
  { type: 'group', direction: 'row', gap: '0.75rem', children: [
    { type: 'rect', height: '3rem', radius: '0.75rem' },
    { type: 'rect', height: '3rem', radius: '0.75rem' },
  ]},
  { type: 'rect', height: '5rem', radius: '0.75rem' },
];

<InstaSkeleton loading={loading} schema={schema} animation="shimmer">
  <SettingsForm />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={settingsSchema} infer={false} animation={animation}>
              <SettingsForm />
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* HOC Example */}
        <DemoSection
          title="Dashboard Stats (HOC)"
          description="Using withInstaSkeleton for reusable wrappers"
          mode="withInstaSkeleton"
          code={`import { withInstaSkeleton } from 'instaskeleton';

const StatWithSkeleton = withInstaSkeleton(StatCard, {
  skeleton: [
    { type: 'line', width: '40%' },
    { type: 'group', gap: '0.5rem', children: [
      { type: 'line', width: '60%', height: '1.75rem' },
      { type: 'line', width: '20%' },
    ]},
  ],
  infer: false,
  cacheKey: 'stat-card',
});

// Usage — just pass loading prop
<StatWithSkeleton loading={loading} label="Downloads" value="12.4k" change="+23%" />`}
        >
          {(loading, animation) => (
            <div className="grid gap-4 sm:grid-cols-3">
              <StatWithSkeleton loading={loading} label="Downloads" value="12.4k" change="+23%" />
              <StatWithSkeleton loading={loading} label="Stars" value="847" change="+12%" />
              <StatWithSkeleton loading={loading} label="Bundle" value="1.65kB" change="gzip" />
            </div>
          )}
        </DemoSection>

        {/* Nested Comments */}
        <DemoSection
          title="Nested Comments"
          description="Testing inference on deeply nested content"
          mode="infer + inferOptions"
          code={`// Inference mode — no schema needed, just wrap your JSX
<InstaSkeleton
  loading={loading}
  infer
  cacheKey="nested"
  animation="shimmer"
  inferOptions={{ maxDepth: 8 }}
>
  <CommentThread comments={comments} />
</InstaSkeleton>`}
        >
          {(loading, animation) => (
            <InstaSkeleton loading={loading} infer cacheKey="nested" animation={animation} inferOptions={{ maxDepth: 8 }}>
              <div className="rounded-xl border border-default-200 p-4">
                <div className="flex gap-3">
                  <Avatar name="A" size="sm" />
                  <div className="flex-1">
                    <p className="font-medium">Root Comment</p>
                    <p className="text-sm text-default-500">Top-level comment with some content.</p>
                    <div className="ml-4 mt-3 border-l-2 border-default-200 pl-4">
                      <div className="flex gap-3">
                        <Avatar name="B" size="sm" />
                        <div className="flex-1">
                          <p className="font-medium">Reply 1</p>
                          <p className="text-sm text-default-500">First nested reply.</p>
                          <div className="ml-4 mt-3 border-l-2 border-default-200 pl-4">
                            <div className="flex gap-3">
                              <Avatar name="C" size="sm" />
                              <div>
                                <p className="font-medium">Reply 2</p>
                                <p className="text-sm text-default-500">Deeper nesting example.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Primitives Reference */}
        <Card className="border border-default-200 bg-white shadow-sm">
          <CardHeader className="border-b border-default-100 bg-default-50/50">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Primitive Nodes Reference</h3>
              <Chip size="sm" variant="flat" color="secondary">always loading</Chip>
            </div>
          </CardHeader>
          <CardBody className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-default-200 p-4">
              <p className="mb-3 text-sm font-semibold text-default-600">line</p>
              <InstaSkeleton loading schema={[{ type: 'line', width: '100%' }, { type: 'line', width: '80%' }, { type: 'line', width: '60%' }]} infer={false} animation="shimmer">
                <span />
              </InstaSkeleton>
            </div>
            <div className="rounded-xl border border-default-200 p-4">
              <p className="mb-3 text-sm font-semibold text-default-600">rect</p>
              <InstaSkeleton loading schema={[{ type: 'rect', height: '4rem', radius: '0.75rem' }, { type: 'rect', height: '2rem', radius: '0.5rem' }]} infer={false} animation="shimmer">
                <span />
              </InstaSkeleton>
            </div>
            <div className="rounded-xl border border-default-200 p-4">
              <p className="mb-3 text-sm font-semibold text-default-600">circle</p>
              <InstaSkeleton loading schema={[{ type: 'circle', width: '3rem', height: '3rem' }, { type: 'circle', width: '2rem', height: '2rem' }]} infer={false} animation="shimmer">
                <span />
              </InstaSkeleton>
            </div>
            <div className="rounded-xl border border-default-200 p-4">
              <p className="mb-3 text-sm font-semibold text-default-600">group</p>
              <InstaSkeleton loading schema={[{ type: 'group', gap: '0.75rem', children: [{ type: 'circle', width: '2.5rem', height: '2.5rem' }, { type: 'line', width: '70%' }, { type: 'line', width: '50%' }] }]} infer={false} animation="shimmer">
                <span />
              </InstaSkeleton>
            </div>
          </CardBody>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-default-500">
          <p>
            Built by{' '}
            <a href="https://github.com/LittleBoy9" className="font-medium text-primary hover:underline" target="_blank" rel="noreferrer">
              LittleBoy9
            </a>{' '}
            &bull; MIT License &bull; ~1.65 KB gzipped
          </p>
        </footer>
      </div>
    </main>
  );
}
