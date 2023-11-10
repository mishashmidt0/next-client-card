interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <main className={"container mx-auto p-24"}>{children}</main>;
}
