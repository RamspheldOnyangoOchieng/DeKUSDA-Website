# UI Components Library - DeKUSDA Website

## Overview

This comprehensive UI components library provides over 200+ reusable components for the DeKUSDA website, built with React, TailwindCSS, and designed for maximum flexibility and consistency.

## Component Categories

### 🎯 Form Components

#### Button
Versatile button component with multiple variants and sizes.

```jsx
import { Button } from '@/components/UI';

// Basic usage
<Button onClick={handleClick}>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

**Props:**
- `variant`: 'default' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'outline'
- `size`: 'sm' | 'default' | 'lg' | 'icon'
- `loading`: boolean
- `disabled`: boolean

#### Input
Flexible input component with validation and icons.

```jsx
import { Input } from '@/components/UI';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';

<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  leftIcon={<AiOutlineMail />}
  error="Invalid email address"
  helperText="We'll never share your email"
  required
/>
```

**Props:**
- `type`: HTML input types
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode
- `size`: 'sm' | 'default' | 'lg'

#### Textarea
Multi-line text input with configurable resize behavior.

```jsx
import { Textarea } from '@/components/UI';

<Textarea
  label="Message"
  rows={4}
  resize="vertical"
  placeholder="Enter your message..."
  error="Message is required"
/>
```

#### Select
Dropdown select component with option groups.

```jsx
import { Select } from '@/components/UI';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' }
];

<Select
  label="Country"
  options={options}
  placeholder="Select a country..."
  error="Please select a country"
/>
```

#### Checkbox & Switch
Boolean input components with customizable styling.

```jsx
import { Checkbox, Switch } from '@/components/UI';

<Checkbox
  label="I agree to the terms"
  description="By checking this box, you agree to our terms of service"
/>

<Switch
  checked={notifications}
  onChange={setNotifications}
  label="Email Notifications"
  description="Receive updates about church events"
/>
```

#### RadioGroup
Radio button group with horizontal/vertical layouts.

```jsx
import { RadioGroup } from '@/components/UI';

const options = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
];

<RadioGroup
  name="frequency"
  options={options}
  value={frequency}
  onChange={setFrequency}
  direction="horizontal"
/>
```

#### FileUpload
Advanced file upload with drag & drop, preview, and validation.

```jsx
import { FileUpload } from '@/components/UI';

<FileUpload
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={3}
  onFileSelect={handleFileSelect}
  dragDrop
  preview
/>
```

### 🏗️ Layout Components

#### Card
Flexible card container with header, content, and footer sections.

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/UI';

<Card hover shadow="lg">
  <CardHeader>
    <CardTitle>Event Title</CardTitle>
    <CardDescription>Join us for this amazing event</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Event details and description...</p>
  </CardContent>
  <CardFooter>
    <Button>Register Now</Button>
  </CardFooter>
</Card>
```

#### Modal
Accessible modal dialog with customizable sizes and behaviors.

```jsx
import { Modal } from '@/components/UI';

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  size="large"
  closeOnOverlayClick={false}
>
  <p>Are you sure you want to proceed?</p>
  <div className="flex justify-end space-x-2 mt-4">
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button variant="destructive" onClick={handleConfirm}>
      Confirm
    </Button>
  </div>
</Modal>
```

#### Tabs
Tabbed interface with multiple variants.

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/UI';

<Tabs defaultValue="overview" variant="pills">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  
  <TabsContent value="overview">
    <p>Overview content...</p>
  </TabsContent>
  
  <TabsContent value="details">
    <p>Details content...</p>
  </TabsContent>
  
  <TabsContent value="reviews">
    <p>Reviews content...</p>
  </TabsContent>
</Tabs>
```

#### Accordion
Collapsible content sections.

```jsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/UI';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
    <AccordionContent>
      Here are the answers to commonly asked questions...
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-2">
    <AccordionTrigger>Church Services</AccordionTrigger>
    <AccordionContent>
      Information about our weekly services...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### 💬 Feedback Components

#### Alert
Contextual alert messages with auto-dismiss and custom actions.

```jsx
import { Alert } from '@/components/UI';

<Alert
  type="success"
  title="Success!"
  message="Your prayer request has been submitted."
  dismissible
  autoClose
  autoCloseDelay={3000}
/>

<Alert type="error" title="Error">
  <p>There was a problem processing your request.</p>
  <Button size="sm" className="mt-2">
    Retry
  </Button>
</Alert>
```

#### Badge
Small status and labeling component.

```jsx
import { Badge } from '@/components/UI';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Inactive</Badge>
<Badge variant="outline" size="lg">New</Badge>
```

#### Loading Components
Various loading states and skeleton loaders.

```jsx
import { Spinner, LoadingSpinner, SkeletonLoader, ProgressBar } from '@/components/UI';

{/* Spinner */}
<Spinner size="lg" color="primary" />

{/* Loading with text */}
<LoadingSpinner text="Loading events..." />

{/* Skeleton loader */}
<SkeletonLoader lines={3} />

{/* Progress bar */}
<ProgressBar
  value={progress}
  max={100}
  showLabel
  label="Upload Progress"
  color="success"
/>
```

#### Tooltip
Hover tooltips with positioning options.

```jsx
import { Tooltip } from '@/components/UI';

<Tooltip content="This is a helpful tooltip" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

### 🧭 Navigation Components

#### Pagination
Complete pagination with page numbers and navigation.

```jsx
import { Pagination, SimplePagination } from '@/components/UI';

{/* Full pagination */}
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  maxVisiblePages={5}
/>

{/* Simple pagination */}
<SimplePagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
```

#### Dropdown
Dropdown menus with items and dividers.

```jsx
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/UI';

<Dropdown
  trigger={<Button>Options</Button>}
  position="bottom-left"
>
  <DropdownItem onClick={() => console.log('Edit')}>
    Edit
  </DropdownItem>
  <DropdownItem onClick={() => console.log('Share')}>
    Share
  </DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={() => console.log('Delete')} disabled>
    Delete
  </DropdownItem>
</Dropdown>
```

### 👤 Data Display Components

#### Avatar
User avatar with fallbacks and grouping.

```jsx
import { Avatar, AvatarGroup } from '@/components/UI';

{/* Single avatar */}
<Avatar
  src="/path/to/image.jpg"
  name="John Doe"
  size="lg"
/>

{/* Avatar group */}
<AvatarGroup max={3} size="default">
  <Avatar name="John Doe" />
  <Avatar name="Jane Smith" />
  <Avatar name="Bob Johnson" />
  <Avatar name="Alice Brown" />
  <Avatar name="Charlie Wilson" />
</AvatarGroup>
```

## Usage Patterns

### Form Validation Example

```jsx
import { useState } from 'react';
import { Input, Button, Alert } from '@/components/UI';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitForm(formData);
      setSuccess(true);
    } catch (error) {
      setErrors(error.validationErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <Alert
          type="success"
          title="Message Sent!"
          message="Thank you for contacting us. We'll get back to you soon."
          dismissible
        />
      )}
      
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        error={errors.name}
        required
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        error={errors.email}
        required
      />
      
      <Textarea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        error={errors.message}
        required
      />
      
      <Button type="submit" loading={loading}>
        Send Message
      </Button>
    </form>
  );
};
```

### Admin Dashboard Layout

```jsx
import { Card, CardHeader, CardTitle, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from '@/components/UI';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <Badge variant="success">+5.2% this month</Badge>
          </CardContent>
        </Card>
        
        {/* More stats cards... */}
      </div>
      
      {/* Tabbed Content */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {/* Overview content */}
        </TabsContent>
        
        <TabsContent value="members">
          {/* Members management */}
        </TabsContent>
        
        <TabsContent value="events">
          {/* Events management */}
        </TabsContent>
      </Tabs>
    </div>
  );
};
```

## Customization

### Theme Integration
All components use CSS custom properties and can be themed:

```css
:root {
  --color-primary: #1d4ed8;
  --color-primary-dark: #1e40af;
  --color-success: #059669;
  --color-warning: #d97706;
  --color-error: #dc2626;
}
```

### TailwindCSS Configuration
Ensure your tailwind.config.js includes the components:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/UI/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#1d4ed8',
        darkBlue: '#1e40af',
        // ... other custom colors
      }
    }
  }
}
```

## Accessibility Features

- ✅ **Keyboard Navigation**: All interactive components support keyboard navigation
- ✅ **Screen Reader Support**: Proper ARIA labels and roles
- ✅ **Focus Management**: Visible focus indicators and logical tab order
- ✅ **Color Contrast**: WCAG AA compliant color combinations
- ✅ **Semantic HTML**: Proper HTML structure and semantics

## Performance Optimizations

- ✅ **Tree Shaking**: Import only components you use
- ✅ **Lazy Loading**: Components are optimized for code splitting
- ✅ **Minimal Dependencies**: Built with minimal external dependencies
- ✅ **Bundle Size**: Optimized for small bundle impact

## Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## Contributing

When adding new components:

1. Follow the established patterns
2. Include TypeScript-style prop documentation
3. Add accessibility features
4. Include usage examples
5. Test with keyboard navigation
6. Ensure responsive design

This UI library provides a solid foundation for building consistent, accessible, and beautiful user interfaces across the entire DeKUSDA website.
