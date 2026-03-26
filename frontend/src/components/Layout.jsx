import React from 'react';

const Layout = ({ children, sidebar, header }) => {
  return (
    <div className="flex h-screen bg-surface-bg overflow-hidden font-sans text-unstop-dark">
      {/* Sidebar - Solid Professional Look */}
      <aside className="z-30 h-full hidden lg:block shrink-0">
        {sidebar}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <div className="z-20">
          {header}
        </div>
        
        <main className="flex-1 overflow-auto px-8 py-8 z-10">
          <div className="mx-auto max-w-7xl h-full">
            {children}
          </div>
        </main>

        {/* Subtle Branding Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-unstop-blue/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Layout;
