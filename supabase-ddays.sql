-- Dayflow D-day sync table
create table if not exists public.ddays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  date date not null,
  show_home boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.ddays enable row level security;

drop policy if exists "Users can view their own ddays" on public.ddays;
create policy "Users can view their own ddays"
  on public.ddays for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own ddays" on public.ddays;
create policy "Users can insert their own ddays"
  on public.ddays for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own ddays" on public.ddays;
create policy "Users can update their own ddays"
  on public.ddays for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own ddays" on public.ddays;
create policy "Users can delete their own ddays"
  on public.ddays for delete to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.ddays to authenticated;
