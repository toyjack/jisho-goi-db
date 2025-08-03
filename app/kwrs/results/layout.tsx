async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>
    </div>
  );
}

export default layout;
