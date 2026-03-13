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

// Demo Section Component with individual loading toggle
function DemoSection({
  title,
  description,
  mode,
  children,
}: {
  title: string;
  description: string;
  mode: string;
  children: (loading: boolean, animation: 'shimmer' | 'pulse' | 'none') => React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState<'shimmer' | 'pulse' | 'none'>('shimmer');

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
      <CardBody className="grid gap-6 p-6 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-dashed border-primary-200 bg-primary-50/30 p-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-600">Skeleton State</p>
          {children(true, animation)}
        </div>
        <div className="rounded-xl border-2 border-dashed border-success-200 bg-success-50/30 p-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-success-600">Loaded Content</p>
          {children(false, animation)}
        </div>
      </CardBody>
      <div className="border-t border-default-100 bg-default-50/30 px-6 py-3">
        <p className="text-xs text-default-400">Toggle <b>Loading/Loaded</b> button to see the live transition</p>
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
        <Button size="sm" variant="light">♥ {post.likes}</Button>
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
              <span className="text-success">✓</span>
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
const chatSchema: SkeletonNode[] = [
  { type: 'group', gap: '0.75rem', children: [{ type: 'circle', width: '2rem', height: '2rem' }, { type: 'rect', width: '65%', height: '2.5rem', radius: '1rem' }] },
  { type: 'group', gap: '0.75rem', children: [{ type: 'rect', width: '50%', height: '2rem', radius: '1rem' }, { type: 'circle', width: '2rem', height: '2rem' }] },
  { type: 'group', gap: '0.75rem', children: [{ type: 'circle', width: '2rem', height: '2rem' }, { type: 'rect', width: '75%', height: '3rem', radius: '1rem' }] },
];

const pricingSchema: SkeletonNode[] = [
  { type: 'line', width: '40%', height: '1.2rem' },
  { type: 'line', width: '50%', height: '2rem' },
  { type: 'line', width: '30%' },
  { type: 'group', gap: '0.5rem', children: [{ type: 'line', width: '80%' }, { type: 'line', width: '70%' }, { type: 'line', width: '85%' }] },
  { type: 'rect', height: '2.5rem', radius: '0.75rem' },
];

const settingsSchema: SkeletonNode[] = [
  { type: 'group', gap: '0.75rem', children: [{ type: 'circle', width: '2.5rem', height: '2.5rem' }, { type: 'group', gap: '0.25rem', children: [{ type: 'line', width: '40%' }, { type: 'line', width: '25%' }] }] },
  { type: 'group', gap: '0.75rem', children: [{ type: 'rect', height: '3rem', radius: '0.75rem' }, { type: 'rect', height: '3rem', radius: '0.75rem' }] },
  { type: 'rect', height: '5rem', radius: '0.75rem' },
  { type: 'group', gap: '1rem', children: [{ type: 'rect', width: '6rem', height: '1.5rem', radius: '999px' }, { type: 'rect', width: '5rem', height: '1.5rem', radius: '999px' }] },
  { type: 'rect', height: '1.5rem', radius: '0.5rem' },
  { type: 'rect', height: '0.75rem', radius: '999px' },
];

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
        {/* Profile Cards - infer mode */}
        <DemoSection title="Profile Cards" description="Team member cards with avatar, name, role, and status chip" mode="infer">
          {(loading, animation) => (
            <InstaSkeleton loading={loading} infer cacheKey="profiles" animation={animation}>
              <div className="grid gap-3">
                {mockUsers.map((u) => <ProfileCard key={u.id} user={u} />)}
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Products - infer mode */}
        <DemoSection title="Product Grid" description="E-commerce cards with price and stock indicator" mode="infer">
          {(loading, animation) => (
            <InstaSkeleton loading={loading} infer cacheKey="products" animation={animation}>
              <div className="grid gap-3">
                {mockProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Social Feed - infer mode */}
        <DemoSection title="Social Feed" description="Social posts with author, content, and action buttons" mode="infer">
          {(loading, animation) => (
            <InstaSkeleton loading={loading} infer cacheKey="social" animation={animation}>
              <div className="grid gap-3">
                {mockPosts.map((p) => <SocialPost key={p.id} post={p} />)}
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Chat - manual schema */}
        <DemoSection title="Chat Thread" description="Conversation with alternating message bubbles" mode="manual schema">
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
        <DemoSection title="Pricing Cards" description="Pricing tiers with features and CTA button" mode="manual schema">
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={pricingSchema} infer={false} animation={animation}>
              <div className="grid gap-4 sm:grid-cols-2">
                <PricingCard name="Starter" price="$0" features={['1 project', 'Community support']} />
                <PricingCard name="Pro" price="$19" features={['Unlimited projects', 'Priority support', 'Analytics']} />
              </div>
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* Settings - manual schema */}
        <DemoSection title="Settings Panel" description="Complex form with inputs, toggles, sliders" mode="manual schema">
          {(loading, animation) => (
            <InstaSkeleton loading={loading} schema={settingsSchema} infer={false} animation={animation}>
              <SettingsForm />
            </InstaSkeleton>
          )}
        </DemoSection>

        {/* HOC Example */}
        <DemoSection title="Dashboard Stats (HOC)" description="Using withInstaSkeleton for reusable wrappers" mode="withInstaSkeleton">
          {(loading) => (
            <div className="grid gap-4 sm:grid-cols-3">
              <StatWithSkeleton loading={loading} label="Downloads" value="12.4k" change="+23%" />
              <StatWithSkeleton loading={loading} label="Stars" value="847" change="+12%" />
              <StatWithSkeleton loading={loading} label="Bundle" value="1.65kB" change="gzip" />
            </div>
          )}
        </DemoSection>

        {/* Nested Comments */}
        <DemoSection title="Nested Comments" description="Testing inference on deeply nested content" mode="infer + inferOptions">
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
            • MIT License • ~1.65 KB gzipped
          </p>
        </footer>
      </div>
    </main>
  );
}
