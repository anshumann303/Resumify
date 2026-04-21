import Footer from "~/components/Footer";

/**
 * PageLayout — wraps every page with a flex-column container that fills the
 * full viewport height.  The `<main>` receives `flex-1` so it expands to push
 * the footer to the bottom regardless of how much content is on the page.
 */
const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
