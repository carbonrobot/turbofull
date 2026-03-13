import { Button, Card, CardHeader, CardBody, CardFooter } from "@repo/ui";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold tracking-tight">Turbofull</h1>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold">Shared UI components</h2>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Components from <code className="font-mono">@repo/ui</code> rendered
            in the web app.
          </p>
        </CardBody>
        <CardFooter className="flex gap-2">
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
