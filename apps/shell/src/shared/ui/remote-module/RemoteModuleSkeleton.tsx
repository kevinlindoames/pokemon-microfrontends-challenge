import { Skeleton, Surface } from '@pokemon-challenge/ui';

type RemoteModuleSkeletonProps = {
  variant: 'detail' | 'history';
};

export function RemoteModuleSkeleton({ variant }: RemoteModuleSkeletonProps) {
  if (variant === 'history') {
    return (
      <Surface as="section" className="space-y-4 p-6">
        <div>
          <Skeleton className="h-4 w-40 rounded-full" />
          <Skeleton className="mt-3 h-9 w-64 rounded-2xl" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-20 rounded-3xl" key={index} />
          ))}
        </div>
      </Surface>
    );
  }

  return (
    <Surface as="section" className="grid gap-6 p-6 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-4">
        <Skeleton className="h-4 w-44 rounded-full" />
        <Skeleton className="h-12 w-72 rounded-2xl" />
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
      </div>

      <Skeleton className="min-h-[24rem] rounded-3xl" />
    </Surface>
  );
}