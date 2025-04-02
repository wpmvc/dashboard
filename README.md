# @wpmvc/admin-sidebar  

[![npm](https://img.shields.io/npm/v/@wpmvc/admin-sidebar.svg)](https://www.npmjs.com/package/@wpmvc/admin-sidebar)  
[![downloads](https://img.shields.io/npm/dm/@wpmvc/admin-sidebar.svg)](https://www.npmjs.com/package/@wpmvc/admin-sidebar)  
[![License](https://img.shields.io/npm/l/@wpmvc/admin-sidebar.svg)](https://www.npmjs.com/package/@wpmvc/admin-sidebar)  
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@wpmvc/admin-sidebar)](https://bundlephobia.com/package/@wpmvc/admin-sidebar)  
[![TypeScript](https://img.shields.io/badge/types-Typescript-blue)](https://www.typescriptlang.org/)  

Professional React hooks for WordPress admin interfaces with complete sidebar management and responsive layout control.

## Features

✨ **Dual Hook System**
- `useActiveAdminMenu` - Intelligent menu highlighting
- `useWPSidebarStatus` - Real-time sidebar state tracking

🚀 **Seamless Integration**
- HashRouter support
- Automatic responsive layout adjustments

⚡ **Performance Optimized**
- Lightweight (under 2KB gzipped)
- Zero unnecessary re-renders
- Efficient DOM operations

---

## Installation  

```bash  
npm install @wpmvc/admin-sidebar react-router-dom  
# or  
yarn add @wpmvc/admin-sidebar react-router-dom  
```  

---

## Usage  

### With React Router  

```tsx  
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';  
import { useActiveAdminMenu, useWPSidebarStatus } from '@wpmvc/admin-sidebar';  

const AdminApp = () => {  
  // Required hooks  
  const navigate = useNavigate();  
  const location = useLocation();  
  const { left, top, width } = useWPSidebarStatus();  

  // Initialize menu management  
  useActiveAdminMenu({  
    pageTopLevelID: '#toplevel_page_my-plugin',  
    rootPaths: ['#/', '#/dashboard'],  
    navigate,  
    location  
  });  

  return (  
    <div style={{  
      marginLeft: left,  
      marginTop: top,  
      width,  
      transition: 'margin-left 0.3s ease'  
    }}>  
      <h1>Dashboard</h1>  
    </div>  
  );  
};  

// Entry point  
export default () => (  
  <HashRouter>  
    <AdminApp />  
  </HashRouter>  
);  
```  

---

## 📚 API Reference  

### `useActiveAdminMenu(config: ActiveMenuConfig)`  

**Required Configuration:**  

| Prop | Type | Description |  
|------|------|-------------|  
| `pageTopLevelID` | `string` | Exact jQuery selector for menu wrapper |  
| `rootPaths` | `string[]` | Base paths (must include `#` prefix) |  
| `navigate` | | From `useNavigate()` |  
| `location` | | From `useLocation()` |  


---

### `useWPSidebarStatus(): SidebarLayout`  

**Return Object:**  

| Property | Type | Example Value |  
|----------|------|--------------|  
| `left` | `string` | `"190px"` (expanded) |  
| `top` | `string` | `"32px"` (admin bar) |  
| `width` | `string` | `"calc(100% - 190px)"` |  

<!-- **Mobile Behavior:**  
Automatically returns `{ left: "0", width: "100%" }` when:  
- Screen width < 782px  
- WordPress mobile menu is active  

--- -->

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute to the project.