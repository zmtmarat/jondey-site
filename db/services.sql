-- ============================================================================
--  Глубокий каталог услуг (как у naimi): категория → конкретная услуга.
--  Каждая услуга = отдельная SEO-страница на сайте (/uslugi/[slug]).
--  Выполнить ОДИН раз в Supabase. Наполнение можно расширять.
-- ============================================================================

create table if not exists public.services (
  id bigint generated always as identity primary key,
  category_id int not null references public.categories(id) on delete cascade,
  slug text not null unique,
  name_ru text not null,
  name_kk text,
  popular boolean not null default false
);
alter table public.services enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where tablename='services' and policyname='services_read') then
    create policy services_read on public.services for select to anon, authenticated using (true);
  end if;
end $$;

-- Наполнение: услуги привязываются к категории по её slug.
insert into public.services (category_id, slug, name_ru, popular)
select c.id, v.slug, v.name, v.pop from (values
  -- Бытовая техника (appliances)
  ('appliances','remont-holodilnika','Ремонт холодильника', true),
  ('appliances','remont-stiralnoi-mashiny','Ремонт стиральной машины', true),
  ('appliances','remont-posudomoechnoi-mashiny','Ремонт посудомоечной машины', false),
  ('appliances','remont-duhovki','Ремонт духовки', false),
  ('appliances','remont-mikrovolnovoi-pechi','Ремонт микроволновой печи', false),
  ('appliances','remont-pylesosa','Ремонт пылесоса', false),
  ('appliances','remont-kofemashiny','Ремонт кофемашины', false),
  ('appliances','remont-kondicionera','Ремонт кондиционера', true),
  ('appliances','zapravka-kondicionera','Заправка кондиционера', true),
  ('appliances','ustanovka-kondicionera','Установка кондиционера', true),
  ('appliances','remont-bojlera','Ремонт бойлера', false),
  ('appliances','remont-kuhonnoi-plity','Ремонт кухонной плиты', false),
  ('appliances','remont-televizora','Ремонт телевизора', true),
  ('appliances','ustanovka-stiralnoi-mashiny','Установка стиральной машины', false),
  ('appliances','ustanovka-posudomoechnoi-mashiny','Установка посудомоечной машины', false),
  ('appliances','ustanovka-vytyazhki','Установка вытяжки', false),
  ('appliances','remont-shveinoi-mashiny','Ремонт швейной машины', false),
  ('appliances','chistka-kondicionera','Чистка кондиционера', false),
  -- Сантехника (plumbing)
  ('plumbing','ustanovka-smesitelya','Установка смесителя', true),
  ('plumbing','ustanovka-unitaza','Установка унитаза', true),
  ('plumbing','ustanovka-vanny','Установка ванны', false),
  ('plumbing','ustanovka-dushevoi-kabiny','Установка душевой кабины', false),
  ('plumbing','ustanovka-rakoviny','Установка раковины', false),
  ('plumbing','ustanovka-vodonagrevatelya','Установка водонагревателя', true),
  ('plumbing','remont-unitaza','Ремонт унитаза', false),
  ('plumbing','remont-smesitelya','Ремонт смесителя', false),
  ('plumbing','prochistka-kanalizacii','Прочистка канализации', true),
  ('plumbing','zamena-trub','Замена труб водоснабжения', false),
  ('plumbing','montazh-otopleniya','Монтаж системы отопления', false),
  ('plumbing','montazh-teplogo-pola','Монтаж тёплого пола', false),
  ('plumbing','ustanovka-kotla','Установка котла отопления', false),
  ('plumbing','ustanovka-schetchika-vody','Установка счётчика воды', false),
  ('plumbing','ustranenie-protechki','Устранение протечки', true),
  ('plumbing','ustanovka-poloentsesushitelya','Установка полотенцесушителя', false),
  -- Транспорт и авто (transport)
  ('transport','remont-akpp','Ремонт АКПП', true),
  ('transport','remont-mkpp','Ремонт МКПП', false),
  ('transport','remont-variatora','Ремонт вариатора', false),
  ('transport','remont-dvigatelya','Ремонт двигателя', true),
  ('transport','kuzovnoi-remont','Кузовной ремонт', true),
  ('transport','pokraska-avto','Покраска автомобиля', true),
  ('transport','zamena-masla','Замена масла', true),
  ('transport','zamena-fary','Замена фары', false),
  ('transport','zamena-avtostekla','Замена автостекла', false),
  ('transport','remont-bampera','Ремонт бампера', false),
  ('transport','razval-shozhdenie','Развал-схождение', false),
  ('transport','kompyuternaya-diagnostika-avto','Компьютерная диагностика авто', true),
  ('transport','uslugi-evakuatora','Услуги эвакуатора', true),
  ('transport','vyezdnoi-avtoelektrik','Выездной автоэлектрик', false),
  ('transport','remont-hodovoi','Ремонт ходовой части', false),
  ('transport','shinomontazh','Шиномонтаж', true),
  -- Спецтехника и оборудование (equipment)
  ('equipment','arenda-manipulyatora','Аренда манипулятора', true),
  ('equipment','arenda-evakuatora','Аренда эвакуатора', false),
  ('equipment','arenda-kompressora','Аренда компрессора', false),
  ('equipment','arenda-krana','Аренда автокрана', true),
  ('equipment','arenda-ekskavatora','Аренда экскаватора', true),
  ('equipment','arenda-pogruzchika','Аренда погрузчика', false),
  ('equipment','arenda-samosvala','Аренда самосвала', false),
  ('equipment','remont-spectehniki','Ремонт спецтехники', false),
  ('equipment','arenda-buroyamy','Аренда ямобура', false),
  -- Уборка (cleaning)
  ('cleaning','uborka-kvartiry','Уборка квартиры', true),
  ('cleaning','generalnaya-uborka','Генеральная уборка', true),
  ('cleaning','uborka-posle-remonta','Уборка после ремонта', true),
  ('cleaning','mojka-okon','Мойка окон', true),
  ('cleaning','himchistka-mebeli','Химчистка мебели', false),
  ('cleaning','himchistka-kovrov','Химчистка ковров', false),
  ('cleaning','uborka-ofisa','Уборка офиса', false),
  ('cleaning','mojka-fasadov','Мойка фасадов', false),
  ('cleaning','dezinfekciya','Дезинфекция помещений', false),
  ('cleaning','vyvoz-musora','Вывоз мусора', true),
  -- Электроника (electronics)
  ('electronics','remont-telefona','Ремонт телефона', true),
  ('electronics','zamena-ekrana-telefona','Замена экрана телефона', true),
  ('electronics','zamena-akkumulyatora-telefona','Замена аккумулятора телефона', false),
  ('electronics','remont-plansheta','Ремонт планшета', false),
  ('electronics','remont-umnyh-chasov','Ремонт умных часов', false),
  ('electronics','remont-naushnikov','Ремонт наушников', false),
  ('electronics','pereproshivka','Перепрошивка устройства', false),
  -- Компьютеры (computer)
  ('computer','remont-kompyutera','Ремонт компьютера', true),
  ('computer','remont-noutbuka','Ремонт ноутбука', true),
  ('computer','ustanovka-windows','Установка Windows', true),
  ('computer','udalenie-virusov','Удаление вирусов', false),
  ('computer','nastroika-routera','Настройка роутера / Wi-Fi', false),
  ('computer','zamena-termopasty','Замена термопасты', false),
  -- Игровые приставки (console)
  ('console','remont-ps','Ремонт PlayStation', true),
  ('console','remont-xbox','Ремонт Xbox', false),
  ('console','remont-dzhojstika','Ремонт джойстика', false),
  ('console','chistka-pristavki','Чистка приставки', false),
  -- Окна и потолки (window)
  ('window','ustanovka-plastikovyh-okon','Установка пластиковых окон', true),
  ('window','remont-okon','Ремонт окон', false),
  ('window','natyazhnye-potolki','Натяжные потолки', true),
  ('window','ustanovka-zhalyuzi','Установка жалюзи', false),
  ('window','moskitnye-setki','Москитные сетки', false),
  -- Мототехника (moto)
  ('moto','remont-mototsikla','Ремонт мотоцикла', false),
  ('moto','remont-skutera','Ремонт скутера', false),
  ('moto','to-mototehniki','ТО мототехники', false),
  -- Обувь и кожа (leather)
  ('leather','remont-obuvi','Ремонт обуви', true),
  ('leather','remont-sumok','Ремонт сумок', false),
  ('leather','zamena-molnii','Замена молнии', false),
  -- Грузчики и разнорабочие (labor)
  ('labor','uslugi-gruzchikov','Услуги грузчиков', true),
  ('labor','gruzoperevozki','Грузоперевозки', true),
  ('labor','raznorabochie','Разнорабочие', false),
  ('labor','pereezd','Квартирный переезд', true),
  ('labor','demontazhnye-raboty','Демонтажные работы', false)
) as v(cat, slug, name, pop)
join public.categories c on c.slug = v.cat
on conflict (slug) do nothing;
