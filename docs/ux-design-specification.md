---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-bmadFitopi-2026-01-03.md
  - _bmad-output/planning-artifacts/sprint-change-proposal-2026-01-29.md
  - _bmad-output/planning-artifacts/implementation-plan-sprint-changes.md
documentCounts:
  prds: 1
  briefs: 1
  projectDocs: 0
workflowType: prd
lastStep: 14
project_name: bmadFitopi
user_name: Ata
date: 2026-01-03
lastUpdated: 2026-01-29
sprintChanges: 2026-01-29
---

# UX Design Specification bmadFitopi

**Author:** Ata
**Date:** 2026-01-03
**Last Updated:** 2026-01-29 (Sprint Changes Integration)

**Note:** This document has been updated to reflect changes identified in Sprint Change Proposal 2026-01-29 and Implementation Plan. Key changes include: navigation simplification (4 tabs → 3 tabs), theme toggle (Light/Dark), chart additions, profile/weight integration, and feature enhancements.

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

bmadFitopi یک محصول «کوچینگ‌محور» برای کاهش وزن پایدار (Phase 1) و نگه‌داشت نتیجه است؛ با این فرض کلیدی که آدم‌ها معمولاً به‌خاطر کمبود اطلاعات شکست نمی‌خورن، بلکه چون وقتی زندگی واقعی وسط میاد (استرس، خستگی، مهمونی، بی‌خوابی، بهم‌ریختگی روتین) کسی کنارشان نیست که کمک‌شان کند ادامه بدهند.

هسته تجربه، یک حلقه‌ی ساده و تکرارشونده است: چک‌این روزانه + لاگ کالری + وزن هفتگی → فهمیدن کانتکست و ریسکِ «ول کردن» → راهنمایی و برنامه‌ی قابل اجرا (نه ایدئال) → ریکاوری بعد از لغزش بدون شرم.
برای MVP، این تجربه در قالب وب‌اپ ارائه می‌شود (موبایل‌فرست)، با مسیر روشن برای موبایل در آینده.

### Target Users

کاربر اصلی، افرادی هستند که بارها تلاش کرده‌اند ولی معمولاً وسط راه رها می‌کنند—به‌خصوص در روزهای پرریسک. پرسونا نمونه: «زهرا»، ۲۵–۳۵ ساله، معمولاً از جنس کاربرانی که از اپ‌های کالری‌شمارِ خشک و قضاوت‌گر خسته‌اند و یک حس «همراهی واقعی» می‌خواهند.

ویژگی‌های رفتاری/نیازی:

- دنبال اصطکاک کم: سریع شروع کند، زود «برد روز اول» بگیرد.
- حساس به لحن: قضاوت/سرزنش = ترک کردن؛ همدلی + قدم کوچک = ادامه دادن.
- استفاده‌ی غالب روی موبایل (مرورگر موبایل)، تعامل‌های کوتاه و روزانه.

### Key Design Challenges

- حفظ «حلقه عادت» حتی وقتی AI خراب می‌شود: لاگ کالری نباید به بن‌بست برسد؛ همیشه باید یک راه ساده برای ذخیره وجود داشته باشد.
- ایجاد اعتماد و حس امنیت روانی: زبان، میکروکپی، و خطاها باید کاملاً غیرقضاوتی باشند تا لغزش‌ها تبدیل به ترک کردن نشوند.
- طراحی فلوهای خیلی سریع برای اکشن‌های اصلی: مخصوصاً لحظه‌ی فعال‌سازی (اولین لاگ کالری ذخیره‌شده) و چک‌این روزانه.
- ریل‌تایم/چت در وب‌اپ با افت کیفیت کنترل‌شده: اگر اتصال ضعیف شد یا realtime افتاد، تجربه نباید “خراب” به نظر برسد.
- مرزبندی «غیرپزشکی»: کوچینگ/ولنس، بدون ادعا یا توصیه‌ی پزشکی—هم در محتوا هم در ساختار تجربه.

### Design Opportunities

- «بردِ روز اول» به‌عنوان لحظه‌ی احساسی: کاربر حس کند “این‌بار فرق دارد” چون ثبت غذا راحت است و واکنش کوچ انسانی/همدلانه است.
- Recovery loop به‌عنوان امضای برند: طراحی یک مسیر خیلی ساده برای “از دست رفت → برگشت” که کاربر را از چرخه‌ی شرم نجات بدهد.
- شخصی‌سازی کم‌اصطکاک: با چند سیگنال کوچک (چک‌این/وزن/کالری) حس “می‌فهمه من چی می‌کشم” ساخته شود، بدون فرم‌های طولانی.
- طراحی خطاهای باکیفیت: خطای AI/آپلود/تاخیر تبدیل شود به تجربه‌ی مراقبت‌گر (“اشکالی نداره، بزن این یکی راه ساده رو”).

## Core User Experience

### Defining Experience

هسته‌ی تجربه bmadFitopi اینه که کاربر بتونه با کمترین اصطکاک ممکن «کالریِ چیزی که خورده» رو ثبت کنه—حتی در روزهای بد. ثبت کالری فقط یک کار تِرَکینگ نیست؛ شروعِ رابطه‌ی کوچینگ و پایه‌ی حلقه‌ی روزانه‌ست. بعد از اولین ثبت موفق، کوچ (AI-first) خیلی سریع با یک پیام **خودمونی، دوستانه و همدلانه** واکنش می‌ده تا کاربر حس کنه: «این یکی قضاوت نمی‌کنه، کمک می‌کنه ادامه بدم.»

### Platform Strategy

- MVP به‌صورت وب‌اپ موبایل‌فرست (touch-first) طراحی می‌شود چون استفاده روزانه و سریع است.
- اپ فعلاً آنلاین است (Offline در این مرحله الزام نیست).
- PWA یک گزینه‌ی خوب است **مشروط به اینکه پیچیدگی فنی زیادی اضافه نکند**؛ هدف PWA صرفاً نزدیک‌تر کردن حس “اپ بودن” (دسترسی سریع، تجربه روان‌تر) است، نه تغییر اسکوپ.

### Effortless Interactions

- **ورودی لاگ کالری از روز اول: متن + عکس** (هر دو فعال)، تا کاربر هر روز گزینه‌ای که راحت‌تره رو انتخاب کنه.
- مسیر اصلی باید تا حد ممکن کوتاه باشد: “وارد کردن/ارسال → دریافت نتیجه → ذخیره”.
- **رفتار در شکست AI (تصمیم نهایی):** در صورت fail شدن AI، مسیر جایگزین برای ذخیره‌سازی نداریم و به کاربر پیام واضح می‌دیم که «بعداً دوباره تلاش کن».

### Critical Success Moments

- **Activation پایه‌ای:** اولین باری که کاربر لاگ کالری را با موفقیت ثبت می‌کند (First calorie log saved).
- **Aha Moment اصلی (احساسی):** چند ثانیه بعد از اولین ثبت، وقتی کوچ یک پیام همدلانه و خودمونی می‌دهد و به جای فشار/قضاوت، یک قدم کوچکِ قابل انجام پیشنهاد می‌کند.
- **Make-or-break moment:** اولین باری که AI fail می‌شود—چون تصمیم گرفتیم fallback نداشته باشیم، این نقطه باید با پیام‌رسانی شفاف و کم‌استرس مدیریت شود تا احتمال ترک کردن کم شود.

### Experience Principles

- «کمترین اصطکاک برای ثبت کالری» (حتی روزهای بد)
- «شفاف و بی‌استرس در خطا» (وقتی AI fail شد: ساده، کوتاه، بدون سرزنش)
- «لحن همدلانه و خودمونی = حفظ کاربر»
- «آنلاین و سریع، موبایل‌فرست»
- «PWA فقط اگر ساده باشد» (بدون سنگین کردن MVP)

## Desired Emotional Response

### Primary Emotional Goals

هدف احساسی اصلی bmadFitopi اینه که کاربر حس کنه **تنها نیست** و یک کوچ/همراه قابل اعتماد کنارش هست—نه یک اپ قضاوت‌گر. این حسِ همراهی باید در همه‌چیز دیده بشه: پیام‌ها، خطاها، و حتی ریزترین متن‌ها.

### Emotional Journey Mapping

- **کشف محصول → امیدواری:** “شاید این بار فرق داره، شاید این بار کسی کنارمه.”
- **حین ثبت کالری → کنجکاوی:** “ببینم چی در میاد / چقدر راحت می‌تونم ثبت کنم؟”
- **بعد از ثبت موفق → رضایت:** “اوکی، انجام شد. سخت نبود. من تونستم.”
- **بعد از اولین پیام کوچ → حمایت شدن:** “فهمید، قضاوت نکرد، یه قدم واقعی بهم داد.”
- **وقتی AI fail می‌شه → دلزدگی (اما کنترل‌شده):** کاربر ممکنه دلزده بشه، ولی سیستم باید با شفافیت و لحن درست، نذاره این دلزدگی تبدیل به ترک کردن یا حس شکست بشه.

### Micro-Emotions

**باید تقویت بشن:**

- همراهی/حمایت
- امیدواری
- رضایت
- اعتماد (به اینکه داده‌ها ذخیره می‌شن و مسیر روشنه)
- حس “می‌تونم انجامش بدم” (self-efficacy)

**باید به صفر نزدیک بشن (خط قرمز):**

- شرم
- قضاوت شدن
- اضطراب
- سردرگمی
- سرزنش
- احساس شکست

### Design Implications

- **لحن و میکروکپی:** همه‌جا باید مثل «مربی مهربون ولی جدی» حرف بزنه: صمیمی، کوتاه، بدون لوس‌بازی، و همیشه با یک قدم بعدی واضح.
- **بعد از ثبت موفق:** پیام کوچ باید فوراً حس “دیده شدی” بده و یک پیشنهاد خیلی کوچک/عملی ارائه کنه (تا آها مومنت ساخته بشه).
- **در خطا (خصوصاً شکست AI):**
  - پیام باید **غیرمقصرسازی** باشه (مشکل از تو نیست).
  - شفاف، کوتاه، و با راهنمایی روشن برای “بعداً دوباره تلاش کن” (بدون فشار و بدون متن‌های فنی).
  - چون fallback نداریم، مهم‌ترین کار اینه که حس “بن‌بست” رو با زبان و مسیر خیلی سبک کاهش بدیم (مثلاً: «الان نشد، اشکال نداره—یه کم بعد دوباره امتحان کن.»).
- **ریتم تجربه:** چون تعامل روزانه‌ست، هیچ چیزی نباید پرحرف/سنگین/فرمی باشه؛ حس همراهی باید از “کوچک و پیوسته” بیاد.

### Emotional Design Principles

- «همراهی اول، عدد بعد»
- «هیچ‌وقت کاربر رو مقصر نکن»
- «همیشه یک قدم بعدی واضح»
- «صمیمی و مهربون، ولی جدی و هدف‌مند»
- «خطاها هم باید حس امنیت بدهند، نه شکست»

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**Telegram (مرجع اصلی برای سادگی و کم‌اصطکاک بودن)**
چیزی که تلگرام خوب انجام می‌ده و به bmadFitopi می‌خوره:

- **کار اصلی سریع و بی‌دردسر:** ارسال پیام/فایل با کمترین مراحل. برای ما معادلشه: “ثبت کالری” باید ۲-۳ قدمه و تمام.
- **وضوح در وضعیت‌ها (State Clarity):** کاربر همیشه می‌فهمه چی شد: ارسال شد؟ در حال ارساله؟ خطا خورد؟ برای ما: “در حال پردازش عکس/متن”، “در حال تخمین”، “خطا”، “تلاش مجدد”.
- **حس کنترل بدون پیچیدگی:** کاربر حس می‌کنه همه‌چی دستشه، ولی UI شلوغ و آموزشی نیست. برای ما: حداقل UI، حداکثر اطمینان.

### Transferable UX Patterns

**Navigation / Structure**

- **تمرکز روی یک اکشن اصلی در صفحه‌ی اصلی:** مثل تلگرام که صفحه اولش برای “انجام کار” ساخته شده، نه برای توضیح دادن. برای bmadFitopi: صفحه‌ی خانه باید کاربر رو مستقیم هل بده به “ثبت کالری”.

**Interaction Patterns**

- **یک ورودی واحد و واضح + انتخاب طبیعی:** تلگرام یک کامپوزر واضح داره و کنارش گزینه‌های کم اما کاربردی (متن/پیوست). برای ما: یک ورودی “ثبت غذا” که هم متن رو پوشش بده هم عکس، بدون اینکه کاربر مجبور بشه مسیرهای پیچیده انتخاب کنه.
- **stateهای روشن برای پردازش/خطا:**
  - در حال انجام: اسپینر/پیام کوتاه “دارم حساب می‌کنم…”
  - خطا: پیام کوتاه + یک CTA واضح “دوباره تلاش کن”
- **کم‌حرفی در لحظه‌ی عمل:** تلگرام وسط کار توضیح اضافه نمی‌ده. برای ما: آموزش‌ها باید حداقلی و بعداً/تدریجی باشن، نه وسط ثبت کالری.

**Visual / Tone Patterns**

- **سادگی و اعتماد:** UI باید حس “این ابزار هر روز جواب می‌ده” بده، نه حس آزمایشگاهی/پزشکی.
- **لحن کوتاه و انسانی:** با توجه به «مربی مهربون ولی جدی»، متن‌ها باید صمیمی ولی محکم باشن: کم‌حرف، واضح، بدون قضاوت.

### Anti-Patterns to Avoid

- **آن‌بوردینگ طولانی و آموزشی:** کاربر خسته‌ست؛ اگر زیاد توضیح بدیم، قبل از “برد روز اول” می‌پره.
- **برنامه‌ی ثابت و فیکس از روز اول بدون حلقه‌ی بازخورد:** چون وعده‌ی محصول “سازگار شدن با زندگی واقعی”ه، هر چیزی که حس “نسخه پیچیدن یک‌باره” بده ضد برند ماست.
- **صفحات شلوغ، داشبوردهای سنگین، نمودارمحوری زودهنگام:** برای MVP، حس همراهی و انجام کار مهم‌تر از تحلیل سنگینه.
- **پیام‌های خطای فنی/ترسناک:** مخصوصاً در خطای AI؛ نباید حس شکست/بی‌عرضگی بده.

### Design Inspiration Strategy

**What to Adopt**

- از تلگرام: “ساده‌سازی اکشن اصلی + وضعیت‌های واضح + CTAهای مستقیم”
- “کم‌حرفی در مسیر انجام کار” (ثبت کالری)

**What to Adapt**

- الگوی stateها: برای ثبت کالری (متن/عکس) باید دقیقاً مثل ارسال پیام/فایل حس بشه: شروع → پردازش → نتیجه/خطا → تلاش مجدد.
- لحن: تلگرام خنثی‌تره؛ ما لحن رو می‌بریم سمت “مربی مهربون ولی جدی” برای ساخت حس حمایت.

**What to Avoid**

- آن‌بوردینگ طولانی و برنامه‌ی ثابت غیرتعاملی
- هر چیزی که حس قضاوت/پزشکی/سرزنش بده
- هر UI که کاربر رو از “ثبت سریع” دور کنه

## Design System Foundation

### 1.1 Design System Choice

برای bmadFitopi در MVP از یک سیستم **Themeable** استفاده می‌کنیم:

- **Tailwind CSS** برای توکن‌ها، لایه‌بندی، و سرعت توسعه
- **shadcn/ui** به‌عنوان کتابخانه‌ی کامپوننت‌های آماده (با پایه‌ی Radix UI) برای ساخت سریع و یکدست UI

هدف: تجربه‌ای **مینیمال و مدرن** با کامپوننت‌های آماده، بدون اینکه وارد هزینه‌ی ساخت Design System کاملاً سفارشی بشیم.

### Rationale for Selection

- **Balance (سرعت + کنترل):** سریع‌تر از Custom، قابل‌تغییرتر از سیستم‌های آماده‌ی سنگین.
- **مناسب برای تیم کوچک و MVP:** کمترین سربار طراحی/نگه‌داری، بیشترین خروجی.
- **سازگار با نیازهای UX:** stateهای واضح، فرم‌ها/دیالوگ‌ها/کامپوننت‌های استاندارد، و کنترل خوب روی تجربه‌ی “کم‌اصطکاک”.
- **هم‌راستا با حس مینیمال/مدرن:** بدون برندینگ سخت‌گیرانه‌ی اولیه هم خروجی تمیز و قابل قبول می‌ده.

### Implementation Approach

- **Default-first:** ابتدا با کامپوننت‌های استاندارد shadcn جلو می‌ریم و فقط وقتی نیاز واقعی بود سفارشی‌سازی می‌کنیم.
- **Consistency-first:** هر الگوی تکرارشونده (مثل stateهای “در حال پردازش/خطا/موفق”) به‌صورت یکپارچه و قابل استفاده مجدد پیاده می‌شه، نه پراکنده و صفحه‌به‌صفحه.
- **Mobile-first:** کامپوننت‌ها و spacing از ابتدا برای موبایل بهینه می‌شن (به‌خصوص مسیر “ثبت کالری”).
- **Copy + tone system:** چون “مربی مهربون ولی جدی” هویت لحن ماست، الگوهای میکروکپی (موفقیت/خطا/در حال پردازش) مثل یک سیستم طراحی در نظر گرفته می‌شن.

### Customization Strategy

- **برند فعلاً مینیمال/مدرن:** سفارشی‌سازی‌ها محدود و اصولی روی توکن‌ها انجام می‌شه (به‌جای تغییر دستی رنگ‌ها/استایل‌ها در هر صفحه).
- **کنترل روی حالت‌ها:** تاکید روی طراحی stateها (loading/success/error/empty) برای تجربه‌ی بدون استرس—به‌خصوص در خطای AI که fallback نداریم.
- **حداقل divergence از shadcn:** تا جای ممکن از همان الگوهای shadcn استفاده می‌کنیم تا سرعت و پایداری حفظ بشه.

## 2. Core User Experience

### 2.1 Defining Experience

تعامل تعریف‌کننده‌ی bmadFitopi اینه که کاربر «کالری رو خیلی راحت ثبت می‌کنه» و همزمان یک کوچ کنارش هست که می‌تونه دغدغه‌هاش رو باهاش مطرح کنه و جواب بگیره—با حس حمایت و همراهی.

اگر کاربر بخواد به دوستش توضیح بده، می‌گه:
«کافیه مثل چت، غذامو بنویسم یا عکس بفرستم؛ کالریم ثبت می‌شه و یه کوچ هم هست که می‌تونم حرفامو بهش بگم، جواب می‌ده و حمایتم می‌کنه.»

### 2.2 User Mental Model

ذهن کاربر این تجربه رو مثل **چت کردن** می‌فهمه، نه مثل “پر کردن فرم” یا “اپ کالری‌شماری خشک”.
پس UI باید:

- پیام‌محور و ساده باشه (یک باکس چت برای ورودی)
- با stateهای واضح حس اعتماد بده (ارسال شد/در حال پردازش/ناموفق)
- لحنِ «مربی مهربون ولی جدی» رو در پاسخ‌ها و ریزمتن‌ها حفظ کنه

### 2.3 Success Criteria

کاربر می‌گه “این عالیه” وقتی:

- **ثبت شدن قطعی و قابل اعتماد** باشه (کاربر شک نکنه که ثبت شد یا نشد)
- **نتیجه واضح** باشه (بدون گیج کردن، مشخص باشه چه چیزی ثبت شده)
- **پیام کوچ به‌موقع و معنی‌دار** بیاد: حس “شناخته شدن” بده و بر اساس داده‌های اخیر/دغدغه کاربر باشه (نه پیام کلیشه‌ای)

### 2.4 Novel UX Patterns

هسته‌ی تجربه روی الگوهای **آشنا و جاافتاده** بنا می‌شه (الگوی چت/ارسال پیام).
نوآوری ما در «نحوه‌ی پاسخ‌گویی و حمایت»ه، نه در پیچیده کردن تعامل. یعنی کاربر هیچ چیز جدیدی برای یاد گرفتن نداشته باشه—فقط حس کنه خروجی بهتر و انسانی‌تره.

### 2.5 Experience Mechanics

**1) Initiation (شروع)**

- کاربر وارد صفحه می‌شه و یک **باکس چت** واضح می‌بینه که دعوتش می‌کنه سریع کار اصلی رو انجام بده (نوشتن غذا یا ارسال عکس).

**2) Interaction (تعامل)**

- کاربر یا متن می‌فرسته یا عکس. تجربه دقیقاً باید حس “ارسال پیام/فایل” بده: سریع، بدون فرم‌های چندمرحله‌ای.

**3) Feedback (بازخورد)**

- سیستم stateهای روشن نشون می‌ده (در حال پردازش/در حال محاسبه).
- بعد از موفقیت: ثبت شدن باید واضح باشه و بعدش پیام کوچ بیاد (همدلانه، خودمونی، ولی هدفمند).
- در صورت خطا: چون fallback نداریم، پیام خطا باید غیرمقصرساز و کوتاه باشه و یک CTA واضح برای “بعداً دوباره تلاش کن” بده (بدون اصطکاک اضافه و بدون ترسوندن کاربر).

**4) Completion (پایان/قدم بعدی)**

- کاربر حس کنه “کار اصلی تموم شد” + یک قدم کوچک بعدی بگیره (مثلاً یک پیشنهاد خیلی کوتاه از طرف کوچ یا دعوت به چک‌این روزانه).

## Visual Design Foundation

### Color System

**Foundation (Themeable via Tailwind + shadcn):**

- رویکرد کلی: مینیمال و مدرن، با خنثی‌های روشن/آرام و یک رنگ اصلی “حمایتی” برای اکشن‌های مهم.
- Primary: emerald به‌عنوان رنگ اصلی اکشن‌ها (CTAها، دکمه اصلی، وضعیت‌های مثبت/پیشروی).
- Neutral base:
  - Light: slate (پس‌زمینه بسیار روشن، متن تیره با کنتراست خوب)
  - Dark: پیشنهاد یکپارچه‌سازی خانواده رنگی با slate (به‌جای ترکیب slate/zinc) تا حس برند در لایت/دارک ثابت‌تر بماند.

**Semantic mapping (معنایی، نه تزئینی):**

- background / foreground: برای خوانایی و آرامش
- card: برای لایه‌بندی ساده
- muted: برای متن‌های کم‌اهمیت و توضیح‌های کوتاه (نه برای اطلاعات حیاتی)
- border / input: مرزهای خیلی نرم و کم‌هیاهو
- secondary (blue): برای لینک‌ها/اکشن‌های ثانویه
- accent (orange): فقط برای “توجه/هشدار ملایم” (نه استفاده گسترده تزئینی)
- destructive: قرمز فقط برای کارهای واقعاً خطرناک (حذف، لغو اشتراک، …)

**Dark mode strategy:**

- هدف در دارک: کاهش خستگی چشم، حفظ حس آرامش، و جلوگیری از “حس خطا/خطر” با رنگ‌های تند.
- تاکید: stateهای محصول (loading/success/error) باید در هر دو تم حس “امن و قابل اعتماد” بدهند.

### Typography System

- فونت اصلی: Vazirmatn
- Tone تایپوگرافی: دوستانه ولی جدی → یعنی تیترهای کوتاه و واضح + متن‌های کم‌حرف و کاربردی
- Hierarchy پیشنهادی برای MVP: Headingهای حداقلی (صفحه باید عمل‌محور باشد) + Body برای پیام‌های کوچ و توضیح‌های کوتاه
- خوانایی در موبایل: line-height راحت و طول خط منطقی برای متن‌های راهنما/پیام کوچ

### Spacing & Layout Foundation

- حس کلی: فضادار و خلوت (airy)
- Mobile-first: اکشن اصلی (ثبت کالری) همیشه در دسترس و نزدیک به انگشت شست + فاصله کافی بین عناصر قابل کلیک
- الگوی چت: حباب‌ها/آیتم‌ها با فاصله مناسب؛ stateها (در حال پردازش/خطا/موفق) نزدیک به پیام مرتبط نمایش داده شوند
- تراکم اطلاعات: از داشبوردهای شلوغ و نمودارمحوری زودهنگام در MVP پرهیز شود

### Accessibility Considerations

- کنتراست متن/پس‌زمینه در Light و Dark حفظ شود (خصوصاً متن‌های muted)
- اندازه هدف‌های لمسی مناسب موبایل (دکمه‌ها/آیکن‌ها)
- خطاها: غیرمقصرساز، کوتاه، بدون اصطلاح فنی؛ و چون fallback نداریم، باید کم‌استرس طراحی شود

## Design Direction Decision

### Design Directions Explored

- D1 (Chat-First Minimal): خانه = مربی، ثبت کالری داخل چت، کمترین اصطکاک.
- D2 (Coach + Quick Actions): چت + اکشن‌های سریع بالای چت (ثبت غذا/چک‌این/کمک).
- D3 (Calories/Dashboard-first): خانه‌ی محصول «داشبوردِ قابل عمل» است (ثبت/خلاصه)، مربی برای حمایت و دغدغه‌ها، ثبت غذا در تجربه‌ای سریع و جداگانه.
- D4/D5/D6: تمرکز روی تایم‌لاین، میکروکپی حمایتی، و کمپوزر بزرگ‌تر برای شروع سریع.

### Chosen Direction

**Direction منتخب: D3 با اصلاحات UI فعلی** (مطابق فولدر `UI/`)

- **تب پیش‌فرض:** Home (داشبورد خلاصه و «دعوت به عمل»)
- **ساختار ناوبری:** Bottom Nav با **۳ تب: Home / Tracker / Coach** (Profile حذف شده و در Home ادغام شده)
  - **تغییر کلیدی Sprint 2026-01-29:** Profile tab حذف شد و Profile management در Home dashboard ادغام شد
  - Home به‌عنوان داشبورد اصلی شامل: خلاصه برنامه، کالری، وزن، پیام‌های مربی، و Profile editing section
  - Tracker به‌عنوان نقطه‌ی اصلی ثبت غذا و وزن (ادغام شده)
- **Coach تجربه‌ی جدا و متمرکز:** صفحه‌ی چت مربی می‌تواند تمام‌صفحه باشد (برای تمرکز) و در این حالت Bottom Nav می‌تواند پنهان شود (مثل UI فعلی).
  - **تغییر Sprint 2026-01-29:** دکمه‌های "کمک می‌خوام" و "لغزش داشتم" حذف شدند - کاربر مستقیماً پیام می‌فرستد
  - **تغییر CRITICAL:** Coach conversation memory system - مربی حداقل 20 پیام قبلی را در context دارد
- **Tracker برای ثبت غذا و وزن (متن/عکس):** 
  - ثبت غذا در یک فلو کوتاه (دکمه Log Food → انتخاب روش → validation → تحلیل → پایان)
  - ثبت وزن در همان صفحه Tracker (ادغام شده - حذف `/tracker/weight` route)
  - **تغییر Sprint 2026-01-29:** 
    - Calorie input validation قبل از ارسال به AI
    - Past date calorie logging (تا 30 روز گذشته)
    - Activity logging (کالری مصرفی)
    - Macronutrients support (پروتئین، کربوهیدرات، چربی)
- **Theme Toggle:** 
  - **تغییر Sprint 2026-01-29:** اضافه شدن Light theme و Theme toggle component
  - استفاده از `next-themes` برای theme management
  - رفع مشکلات Firefox
- **Charts:**
  - **تغییر Sprint 2026-01-29:** 
    - Bar chart برای کالری (7 روز گذشته) با daily calorie limit reference line
    - Line chart برای وزن (تاریخچه وزن)
    - استفاده از Recharts (standard shadcn)
- **AI failure تصمیم نهایی:** fallback نداریم؛ پیام «بعداً دوباره تلاش کن» با لحن غیرمقصرساز و بدون ترس.
  - اصل UX: کاربر حس بن‌بست «کم‌استرس» بگیرد (نه حس شکست).
  - نکته‌ی اجرایی: تا حد ممکن ورودی کاربر از بین نرود (برای تلاش مجدد)، اما «ثبت دستی کالری» ارائه نمی‌شود.
- **Auth:**
  - **تغییر Sprint 2026-01-29:** Unified Auth Page - ادغام Signin/Signup/Recover به یک صفحه واحد (`/auth`)
  - تشخیص خودکار: اگر کاربر وجود دارد → signin، اگر نه → signup
  - Recovery flow حذف شده (Story 1.6)
- **زبان/RTL:** تجربه‌ی نهایی کاملاً فارسی + RTL
  - `html lang="fa" dir="rtl"`
  - فونت اصلی: Vazirmatn
  - اعداد/واحدها/فرمت تاریخ و کپی‌ها همگی فارسی و همدلانه («مربی مهربون ولی جدی»)

### Design Rationale

- Home-first باعث می‌شود کاربر هر روز با «یک نگاه سریع + یک قدم بعدی واضح» وارد شود، بدون اینکه مجبور باشد اول وارد چت یا فرم ثبت شود.
- ادغام Profile در Home: ساده‌سازی navigation و کاهش redundancy - کاربر نیازی به تب جداگانه برای Profile ندارد.
- جدا کردن Tracker از Coach، اصطکاک ثبت غذا را کنترل می‌کند و Coach را برای «حمایت و ریکاوری» پاکیزه نگه می‌دارد.
- ادغام Weight در Tracker: تمرکز روی یک صفحه برای tracking - کاربر همه چیز را در یک جا می‌بیند.
- Theme toggle: بهبود تجربه کاربری و دسترسی‌پذیری - کاربر می‌تواند تم مورد علاقه خود را انتخاب کند.
- Charts: نمایش واضح پیشرفت - Bar chart برای کالری و Line chart برای وزن به کاربر کمک می‌کند پیشرفت خود را ببیند.
- عدم fallback برای AI، اسکوپ MVP را سبک نگه می‌دارد؛ ریسکِ ترک کردن در خطای AI با **میکروکپی درست + حالت‌های واضح + امکان تلاش مجدد** کاهش داده می‌شود.
- فارسی/RTL کامل، هم‌راستای پرسونای اصلی و لحن محصول است و حس «ابزار خودی و غیرقضاوتی» را تقویت می‌کند.

### Implementation Approach

- UI Alignment Checklist:
  - فعال‌سازی RTL در ریشه (`lang="fa" dir="rtl"`)
  - لود Vazirmatn و اعمال آن به کل UI
  - فارسی‌سازی کامل متن‌ها (تب‌ها، هدینگ‌ها، پیام‌ها، placeholderها، error/loading stateها)
  - تثبیت الگوی ناوبری ۴ تبی و رفتار Coach (تمام‌صفحه/پنهان شدن nav)
  - تعریف استاندارد stateها (loading/success/error) مخصوصاً برای AI failure با پیام «بعداً دوباره تلاش کن»

## User Journey Flows

### Journey 1 — Onboarding → Program → Activation → Trial-to-Paid (Happy Path)

هدف: کاربر سریع وارد شود، برنامه ۸ هفته‌ای را شروع کند، «اولین ثبت کالری» را انجام دهد، و قبل از پایان Trial ارزش را حس کند.

```mermaid
flowchart TD
  A[ورود به اپ] --> B{کاربر لاگین است؟}
  B -- خیر --> C[ثبت‌نام/ورود با شماره موبایل (OTP)]
  C --> D[انتخاب برنامه ۸ هفته‌ای]
  D --> E[انتخاب سختی/هدف: ۳٪ / ۵٪ / ۷٪]
  E --> F[شروع Trial (۷ روز)]
  F --> G[Home (پیش‌فرض): خلاصه امروز + دعوت به ثبت غذا]
  G --> H[CTA: ثبت غذا → Tracker]
  H --> I{روش ثبت؟}
  I -- متن --> J[نوشتن غذا]
  I -- عکس --> K[آپلود عکس]
  J --> L[در حال تحلیل… (state واضح)]
  K --> L
  L --> M{AI موفق؟}
  M -- بله --> N[ثبت لاگ کالری (Saved)]
  N --> O[بازگشت به Home: آپدیت خلاصه + CTA «صحبت با مربی»]
  O --> P[Coach: پیام کوتاه/همدلانه + قدم بعدی کوچک]
  P --> Q[شب: چک‌این روزانه (کوتاه)]
  Q --> R[روزهای ۱ تا ۶: تکرار حلقه (Home→Tracker/Coach)]
  R --> S{پایان Trial؟}
  S -- خیر --> G
  S -- بله --> T[Paywall: ادامه کوچینگ نیازمند اشتراک]
  T --> U{پرداخت موفق؟}
  U -- بله --> V[فعال شدن اشتراک + ادامه کوچینگ]
  U -- خیر --> W[بازگشت به حالت Trial/Expired + راهنمایی ساده]
```

### Journey 2 — AI Failure هنگام ثبت غذا (Retry with Preserved Input)

هدف: خطای AI تبدیل به «حس شکست» نشود. کاربر راه واضح برای تلاش مجدد داشته باشد و ورودی‌اش (متن یا عکس) حفظ شود تا مجبور نباشد دوباره تایپ یا آپلود کند.

```mermaid
flowchart TD
  A[Home] --> B[Tracker: ثبت غذا]
  B --> C{متن/عکس}
  C --> D[ارسال برای تحلیل]
  D --> E[loading state: «دارم حساب می‌کنم…»]
  E --> F{AI موفق؟}
  F -- بله --> G[ثبت لاگ + پیام موفقیت]
  F -- خیر --> H[نمایش خطای غیرمقصرساز]
  H --> I[ورودی کاربر حفظ می‌شود: متن/عکس در UI باقی می‌ماند]
  I --> J[CTA: «بعداً دوباره تلاش کن»]
  J --> K{می‌خواهد الان دوباره تلاش کند؟}
  K -- بله --> D
  K -- خیر --> L[بازگشت به Home - ورودی حفظ شده برای بعد]
  L --> M[Coach (اختیاری): پیام حمایتی کوتاه برای جلوگیری از ترک کردن]
```

**میکروکپی پیشنهادی خطا:**

- Title: «الان نشد»
- Body: «الان نتونستم حسابش کنم. مشکل از تو نیست. چند دقیقه دیگه دوباره امتحان کن.»
- CTA: «بعداً دوباره تلاش کن» (ورودی حفظ شده، نیازی به تایپ/آپلود مجدد نیست)

**قوانین حفظ ورودی:**

- **متن:** متن تایپ شده در input field باقی می‌ماند
- **عکس:** اگر مرورگر اجازه دهد، فایل عکس در memory/cache حفظ می‌شود؛ در غیر این صورت، UI واضح بگوید «لطفاً دوباره عکس را انتخاب کن» (اما متن توضیحی کاربر حفظ می‌شود)

### Journey 3 — Daily Check-in + Coach Support (Core Loop)

هدف: چک‌این کوتاه، بدون فرم‌های سنگین؛ خروجی تبدیل به پیام مربی و قدم بعدی کوچک شود.

```mermaid
flowchart TD
  A[Home] --> B{چک‌این امروز انجام شده؟}
  B -- خیر --> C[CTA: چک‌این امروز]
  C --> D[سوالات کوتاه (۲-۴ سوال)]
  D --> E[ثبت چک‌این]
  E --> F[Coach: پیام همدلانه + پیشنهاد خیلی کوچک]
  F --> G[کاربر پیام می‌دهد؟ (اختیاری)]
  G -- بله --> H[گفتگو در Coach]
  G -- خیر --> I[بازگشت به Home]
  B -- بله --> I
```

### Journey Patterns

- Home-first = «یک نگاه سریع + یک اقدام بعدی واضح»
- Tracker = ثبت غذا در کمترین مراحل ممکن (متن/عکس)
- Coach = صفحه‌ی متمرکز چت (تمام‌صفحه) با لحن «مربی مهربون ولی جدی»
- State clarity = برای هر عمل اصلی: loading / success / error با پیام کوتاه و CTA واضح

### Flow Optimization Principles

- حداقل کلیک تا «اولین ثبت کالری»
- جلوگیری از بن‌بست‌های احساسی: خطاها کوتاه، غیرمقصرساز، و با CTA روشن
- موبایل‌فرست: CTAهای بزرگ، فاصله مناسب، و کم‌حرفی در لحظه عمل
- فارسی/RTL: همه مسیرها و متن‌ها از ریشه RTL و خوانا

## Component Strategy

### Design System Components

**پایه‌ی UI:** Tailwind CSS + shadcn/ui (Radix) با توکن‌های تم موجود در پروژه `UI/`.

**کامپوننت‌هایی که قطعاً از shadcn استفاده می‌کنیم (طبق نیاز فعلی و لیست فعلی):**

- Button, Card
- Badge
- Avatar
- Dropdown Menu
- Checkbox
- Calendar
- Date Picker (با ظاهر shadcn، ولی تاریخ شمسی/جلالی)
- Form field / Field (الگوی فرم + Label + Input + Error)
- Input
- Input OTP
- Progress
- Table
- Chart
- Sonner (Toast/Notifications)
- Toggle

**کامپوننت‌های پایه‌ی لازم که در لیست اولیه نبود ولی برای UX لازم‌اند:**

- Dialog / Drawer (برای فلوهای کوتاه مثل Log Food)
- Tabs (در صورت نیاز داخل صفحات)
- Textarea (برای چت کوچ)
- Select (برای گزینه‌های محدود)
- Skeleton (برای loadingهای صفحه‌ای)

### Custom Components

این‌ها کامپوننت‌های «خاص bmadFitopi» هستند که shadcn مستقیم پوشش نمی‌دهد و باید به عنوان feature components ساخته شوند:

#### AppShell + BottomNav

**Purpose:** اسکلت اپ + ناوبری پایین برای **۳ تب** (تغییر Sprint 2026-01-29).

- **Anatomy:** Container, Main content, Bottom nav items (آیکون + لیبل)
- **States:** active tab, disabled (در صورت gating)
- **RTL:** ترتیب بصری/spacing و alignment با RTL
- **Content:** لیبل‌ها فارسی: «خانه / ثبت / مربی» (Profile tab حذف شده - Profile در Home ادغام شده)
- **Theme Toggle:** اضافه شده در Home dashboard (آیکون sun/moon برای toggle بین Light/Dark)

#### HomeDashboardCard (کارت «جمع امروز»)

**Purpose:** یک نگاه سریع + CTA اصلی «ثبت غذا» + Profile section (تغییر Sprint 2026-01-29)

- **Content:** 
  - مجموع کالری امروز / daily calorie limit
  - Bar chart برای 7 روز گذشته (کالری دریافتی vs limit)
  - خلاصه وزن (آخرین وزن ثبت شده)
  - پیام‌های اخیر مربی
  - Profile editing section (ادغام شده)
- **Actions:** CTA اصلی: رفتن به Tracker و باز کردن Log Food
- **States:** empty (هیچ ثبت امروز)، normal، loading (اگر دیتای واقعی بعداً بیاد)
- **Theme Toggle:** دکمه toggle theme در بالای dashboard

#### CoachChat (صفحه چت با کوچ)

**Purpose:** چت متمرکز (تمام‌صفحه) برای پیام‌های کوچ + چک‌این داخل چت

- **Subcomponents:**
  - MessageList
  - MessageBubble (user/coach)
  - TypingIndicator
  - Composer (Textarea + Send + optional attachments later)
  - CheckInInlineCard (کارت چک‌این داخل چت)
- **States:** empty state، sending، error (ارسال ناموفق)، typing
- **تغییر Sprint 2026-01-29:**
  - دکمه‌های "کمک می‌خوام" و "لغزش داشتم" حذف شدند
  - کاربر مستقیماً پیام می‌فرستد
  - **Coach Conversation Memory:** مربی حداقل 20 پیام قبلی را در context دارد و به پیام‌های قبلی اشاره می‌کند

#### CheckInInlineCard (داخل چت)

**Purpose:** چک‌این روزانه کوتاه (۲–۴ سوال) بدون صفحه جدا

- **Behavior:** سوال‌ها پشت سر هم (stepper سبک) یا یک کارت با چند فیلد
- **States:** not_started / in_progress / submitted
- **Accessibility:** فوکوس درست بین سوال‌ها، اعلام خطا/validation

#### TrackerLogFoodDialog (فلو «ثبت غذا» در Tracker)

**Purpose:** ثبت غذا با متن یا عکس و نمایش نتیجه داخل Tracker

- **Flow:** Log Food → انتخاب روش → **validation** → analyzing → نتیجه → ذخیره/پایان
- **States:** selecting_method / inputting / **validating** / analyzing / success / **validation_error** / ai_error
- **تغییر Sprint 2026-01-29:**
  - **Calorie Input Validation:** قبل از ارسال به AI، ورودی validate می‌شود (confidence threshold: 0.7)
  - **Past Date Logging:** date picker برای انتخاب تاریخ گذشته (تا 30 روز)
  - **Macronutrients:** نمایش پروتئین، کربوهیدرات، چربی در نتیجه
  - **Activity Logging:** بخش جداگانه برای ثبت فعالیت و کالری مصرفی
- **AI error:** فقط «بعداً دوباره تلاش کن» (بدون fallback ذخیره دستی)
- **Validation error:** "این ورودی به نظر خوراکی نیست. لطفاً غذای خود را توصیف کنید."

#### AIAnalyzingState + Spinner

**Purpose:** state استاندارد برای “دارم حساب می‌کنم…”

- **Use:** Tracker + هر جای نیاز
- **Design:** کم‌استرس، با متن کوتاه فارسی و progress/spinner
- **Note:** Spinner در shadcn نیست → یک کامپوننت ساده‌ی داخلی می‌سازیم.

#### ErrorBanner (برای خطای AI)

**Purpose:** پیام غیرمقصرساز + CTA روشن

- **Copy نمونه:** «الان نتونستم حسابش کنم. مشکل از تو نیست. چند دقیقه دیگه دوباره امتحان کن.»
- **Actions:** Retry (همان ورودی) / Close (بازگشت به Tracker)

#### ValidationErrorBanner (برای خطای Validation)

**Purpose:** پیام خطا برای ورودی نامعتبر (تغییر Sprint 2026-01-29)

- **Copy:** "این ورودی به نظر خوراکی نیست. لطفاً غذای خود را توصیف کنید."
- **Actions:** Edit Input (اصلاح ورودی) / Close

#### CalorieLimitBarChart (Bar Chart برای کالری)

**Purpose:** نمایش کالری 7 روز گذشته با daily limit reference line (تغییر Sprint 2026-01-29)

- **Technology:** Recharts BarChart
- **Data:** 7 days of calorie intake
- **Reference Line:** daily calorie limit (dashed line)
- **RTL Support:** Persian labels, RTL layout
- **Location:** Home dashboard

#### WeightHistoryLineChart (Line Chart برای وزن)

**Purpose:** نمایش تاریخچه وزن (تغییر Sprint 2026-01-29)

- **Technology:** Recharts LineChart
- **Data:** weight history (last 30 days or all)
- **RTL Support:** Persian labels, RTL layout
- **Location:** Tracker page (Weight section)

#### ThemeToggle

**Purpose:** Toggle بین Light و Dark theme (تغییر Sprint 2026-01-29)

- **Technology:** next-themes
- **Icon:** sun/moon
- **Location:** Home dashboard (top right)
- **Behavior:** Toggle between light/dark themes
- **Persistence:** User preference saved

#### TrialBadge / SubscriptionStatusChip (اختیاری فاز بعد)

**Purpose:** نمایش وضعیت Trial/Paid/Expired (در Home یا Profile)

- **States:** trial_active, paid, expired

### Component Implementation Strategy

- **Design tokens:** همه customها فقط از توکن‌های CSS (`--background`, `--primary`, …) و utilityهای Tailwind استفاده می‌کنند.
- **Foldering پیشنهادی:**
  - `UI/src/app/components/ui/*` = shadcn (همان الگو)
  - `UI/src/app/components/*` = feature components (HomeDashboardCard, CoachChat, TrackerLogFoodDialog, …)
  - در صورت رشد: `UI/src/app/features/{home,tracker,coach,profile}/*`
- **RTL/FA foundations (اجباری):**
  - `html lang="fa" dir="rtl"`
  - فونت Vazirmatn (لود واقعی در `fonts.css`)
  - formatterهای مشترک:
    - اعداد فارسی (digits)
    - تاریخ شمسی برای نمایش
- **Date Picker شمسی (جلالی): گزینه‌های اجرایی**
  - گزینه A (ترجیحی برای سازگاری با shadcn): استفاده از UI shadcn Calendar/Popover ولی با زیرساخت تاریخ جلالی (نیازمند یک lib جلالی + formatter)
  - گزینه B (کم‌ریسک‌تر): استفاده از یک datepicker جلالی آماده (با استایل‌دهی مطابق shadcn) و wrap کردن داخل کامپوننت `JalaliDatePicker`

### Implementation Roadmap

**Phase 1 — Core (مسیرهای حیاتی Step-10)**

- AppShell + BottomNav (**۳ تب** - Profile حذف شده)
- HomeDashboardCard + CTA «ثبت غذا» + Profile section (ادغام شده)
- TrackerLogFoodDialog + AIAnalyzingState + ErrorBanner + ValidationErrorBanner + Spinner
- CoachChat + MessageBubble + Composer (بدون action buttons)
- Weight logging section در Tracker (ادغام شده)
- CalorieLimitBarChart + WeightHistoryLineChart (Recharts)
- ThemeToggle (next-themes)
- Unified Auth Page (`/auth`)
- Input OTP (برای Auth scaffold)
- Sonner (toast پایه)

**Phase 2 — Support & Consistency**

- CheckInInlineCard داخل چت
- Profile cards پایه
- Progress patterns یکپارچه (loading/success/error)
- Dropdownهای تنظیمات

**Phase 3 — Enhancements**

- Chartها و گزارش‌های سبک
- Tableهای مدیریتی/تاریخچه
- Date picker جلالی نهایی و استاندارد

## UX Consistency Patterns

### Foundations (FA/RTL) — قانون صفر (Non-Negotiable)

- Root: `html lang="fa" dir="rtl"`
- Font: Vazirmatn باید **واقعاً load** شود و default کل UI باشد.
- Numbers:
  - Display: اعداد فارسی (digits) در UI
  - Input: فیلدهایی مثل OTP/شماره موبایل می‌توانند LTR باشند (ولی صفحه RTL)
- Dates:
  - Display: شمسی/جلالی + اعداد فارسی
  - Input/Picker: ظاهر shadcn، منطق جلالی در لایه زیرین (wrapper)

---

### Global State Contracts (برای تست‌پذیری)

برای هر اکشن async (AI analyze، ارسال پیام، OTP verify):

- **state** یکی از این‌هاست: `idle | loading | success | error`
- **loading** همیشه یک indicator + متن کوتاه دارد
- **error** همیشه:
  - پیام غیرمقصرساز (deterministic)
  - حداقل ۱ CTA روشن (Retry یا Close)
  - مسیر برگشت امن (بن‌بست ندهد)

---

### Button Hierarchy

**Primary**

- فقط ۱ CTA اصلی در هر صفحه/کارت.
- Home: فقط «ثبت غذا»
- اندازه موبایل: min-height ≈ 44px

**Secondary**

- اکشن مکمل: «بازگشت»، «بعداً»، «لغو»

**Ghost/Tertiary**

- اکشن کم‌اهمیت: تنظیمات/لینک‌های کمکی

**Destructive**

- فقط حذف/لغو اشتراک/خروج + تأیید دوم (Dialog)

**Bottom Nav**

- MVP: آیکون + لیبل فارسی «خانه / ثبت / مربی» (Profile حذف شده - ادغام در Home)
- Active state: واضح و consistent

**Theme Toggle**

- آیکون sun/moon در Home dashboard
- Toggle behavior: Light ↔ Dark

---

### Feedback Patterns (deterministic copy)

#### Loading

- الگو: `AIAnalyzingState + Spinner`
- Copy:
  - اصلی: «دارم حساب می‌کنم…»
  - فرعی (اگر >5s): «ممکنه چند ثانیه طول بکشه.»

#### Success

- Tracker: نتیجه داخل همان صفحه
- Sonner toast: فقط تایید کوتاه (مثلاً «ثبت شد»)، نه پیام‌های مهم

#### Error — Validation Failure (تغییر Sprint 2026-01-29)

- Component: `ValidationErrorBanner`
- Copy template (ثابت):
  - Title: «ورودی نامعتبر»
  - Body: «این ورودی به نظر خوراکی نیست. لطفاً غذای خود را توصیف کنید.»
- CTAها:
  - Primary: «اصلاح ورودی» (بازگشت به input field)
  - Secondary: «لغو» (بستن dialog)
- **Validation behavior:**
  - Validation قبل از ارسال به AI انجام می‌شود
  - Confidence threshold: 0.7
  - Validation time: < 2 seconds
  - False positive rate: < 5%

#### Error — AI Failure (Retry with Preserved Input)

- Component: `ErrorBanner`
- Copy template (ثابت):
  - Title: «الان نشد»
  - Body: «الان نتونستم حسابش کنم. مشکل از تو نیست. چند دقیقه دیگه دوباره امتحان کن.»
- CTAها:
  - Primary: «بعداً دوباره تلاش کن» (ورودی حفظ شده، نیازی به تایپ/آپلود مجدد نیست)
  - Secondary: «باشه» (بازگشت به Home)
- **Input retention rule (CRITICAL):**
  - **متن:** متن کاربر بعد از fail پاک نشود و در input field باقی بماند
  - **عکس:** 
    - اگر مرورگر اجازه نگه‌داری فایل را بدهد: فایل عکس در memory/cache حفظ شود
    - اگر مرورگر اجازه نگه‌داری فایل را ندهد: UI واضح بگوید «لطفاً دوباره عکس را انتخاب کن» (اما متن توضیحی کاربر اگر وجود داشته باشد حفظ می‌شود)
  - **Retry behavior:** وقتی کاربر "بعداً دوباره تلاش کن" را می‌زند، همان ورودی حفظ شده دوباره ارسال می‌شود (بدون نیاز به تایپ/آپلود مجدد)
- **Retry/backoff rule:**
  - بعد از 3 fail پشت سر هم: دکمه Retry به مدت 30 ثانیه disabled + متن: «کمی بعد دوباره امتحان کن.»
  - بعد از 30 ثانیه: دکمه دوباره فعال می‌شود و کاربر می‌تواند با همان ورودی حفظ شده retry کند

#### Error — Coach Message Send

- در همان bubble پیام کاربر:
  - Badge: «ارسال نشد»
  - CTA: «ارسال دوباره»
  - پیام از بین نرود

---

### Form Patterns

#### OTP

- stateها + کپی ثابت:
  - wrong: «کد اشتباهه»
  - expired: «کد منقضی شده. دوباره کد بگیر»
  - rate-limited: «زیاد تلاش کردی. {mm:ss} دیگه دوباره امتحان کن»
- Resend: countdown واضح؛ CTA فقط بعد از پایان countdown
- A11y: فوکوس خودکار + ARIA live برای خطا

#### Check-in داخل چت (۲–۴ سوال)

- `CheckInInlineCard`
- validation حداقلی
- بعد از submit: پیام کوچ فوری + قدم بعدی کوچک

---

### Navigation Patterns

- Default tab: Home
- Coach تمام‌صفحه؛ Bottom Nav می‌تواند مخفی شود
- Back behavior (MVP): برگشت به Home
- Escape hatch: از هر modal/dialog خروج امن به Tracker/Home
- **تغییر Sprint 2026-01-29:**
  - Navigation: 3 tabs (Home/Tracker/Coach) - Profile حذف شده
  - Profile editing در Home dashboard
  - Weight logging در Tracker (حذف `/tracker/weight` route)
  - Unified Auth Page (`/auth`) - ادغام Signin/Signup/Recover

---

### Modal/Overlay

- Log Food: Dialog/Drawer موبایل‌فرست
- Close: Back + کلیک بیرون/ESC (اگر مناسب بود)
- loading/error داخل modal هم تابع state contract

---

### Empty & First-Day States

- Home (بدون ثبت): متن کوتاه + CTA «ثبت غذا»
- Tracker (بدون آیتم): empty + CTA «ثبت غذا» یا «ثبت وزن»
- Coach (شروع): خوشامد کوتاه + دعوت به ثبت غذا/چک‌این
- **تغییر Sprint 2026-01-29:**
  - Home empty state: شامل دعوت به ثبت غذا، چک‌این، و صحبت با مربی
  - Tracker empty state: شامل دعوت به ثبت غذا و وزن
  - Coach empty state: بدون action buttons - فقط دعوت به پیام فرستادن

---

### QA/Dev Notes

- Copy تا حد ممکن deterministic باشد
- stateها ثابت: idle/loading/success/error

## Responsive Design & Accessibility

### Responsive Strategy

**Mobile-first (اولویت اصلی)**

- تجربه‌ی اصلی روی موبایل طراحی می‌شود: CTAهای بزرگ، فاصله‌ی مناسب، مسیرهای کوتاه.
- Bottom Navigation همیشه حاضر است (**۳ تب** - Profile حذف شده)، به‌جز صفحاتی مثل Coach که ممکن است تمام‌صفحه شود.
- **تغییر Sprint 2026-01-29:**
  - Theme toggle در Home dashboard (responsive)
  - Charts (Bar/Line) responsive برای موبایل
  - رفع مشکلات Firefox در theme switching

**Tablet**

- همان ساختار موبایل حفظ می‌شود (Bottom Nav باقی می‌ماند - 3 tabs).
- از فضای بیشتر برای افزایش خوانایی/spacing استفاده می‌کنیم، نه برای پیچیده‌کردن UI.
- Charts در tablet: استفاده بهتر از فضای بیشتر برای نمایش داده‌ها

**Desktop**

- Bottom Nav مثل موبایل باقی می‌ماند (برای یکپارچگی و کاهش پیچیدگی - 3 tabs).
- محتوا در مرکز با max-width کنترل می‌شود تا طول خط زیاد نشود.
- Charts در desktop: استفاده از فضای بیشتر برای نمایش بهتر داده‌ها

### Breakpoint Strategy

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

قانون: تغییر layout فقط وقتی انجام شود که «ارزش UX» داشته باشد (نه صرفاً به خاطر عرض صفحه). در غیر این صورت فقط density/spacing تنظیم می‌شود.

### Accessibility Strategy

در این مرحله، سطح رسمی WCAG تعیین نمی‌شود. هدف MVP:

- جلوگیری از بلاکرهای واضح دسترسی‌پذیری (baseline)

حداقل‌های baseline:

- touch target حداقل 44×44
- label/aria-label برای inputها و icon buttonها
- focus state واضح برای عناصر قابل تعامل
- کنتراست قابل قبول (به‌خصوص در حالت dark و متن‌های muted)
- مدیریت فوکوس برای Dialog/Drawer (باز/بسته شدن)

### Testing Strategy

**Responsive**

- تست دستی روی موبایل واقعی + شبیه‌ساز
- مرورگرهای کلیدی: Chrome + Safari (به‌خصوص iOS Safari) + **Firefox** (رفع مشکلات theme)
- بررسی رفتار Bottom Nav (3 tabs)، Dialog/Drawer، و چت Coach در عرض‌های مختلف
- تست Theme toggle در همه مرورگرها (خصوصاً Firefox)

**Accessibility baseline**

- چک دستی: keyboard-only navigation برای فرم‌ها و Dialogها
- چک فوکوس: OTP، Dialog/Drawer، دکمه‌های icon، Theme toggle
- بررسی کنتراست در Light/Dark (هر دو theme باید قابل استفاده باشند)
- تست Charts با screen reader (RTL support)

**Feature Testing (Sprint Changes 2026-01-29)**

- تست Calorie Input Validation (false positive rate < 5%)
- تست Coach Conversation Memory (20+ messages preserved)
- تست Past Date Logging (تا 30 روز گذشته)
- تست Activity Logging flow
- تست Macronutrients display
- تست Daily Calorie Limit calculation & display
- تست Weight logging در Tracker (ادغام شده)
- تست Profile editing در Home
- تست Unified Auth Page

### Implementation Guidelines

- Mobile-first CSS (spacing و typographic scale)
- max-width برای دسکتاپ جهت جلوگیری از خطوط خیلی بلند
- استفاده از کامپوننت‌های shadcn/Radix برای focus management
- رعایت الگوی stateها (idle/loading/success/error) برای تجربه‌ی قابل پیش‌بینی
- **تغییر Sprint 2026-01-29:**
  - استفاده از `next-themes` برای theme management
  - استفاده از Recharts برای charts (Bar/Line)
  - CSS variables برای theme colors (Light/Dark)
  - رفع مشکلات Firefox در theme switching
  - RTL support برای charts (Persian labels)

---

## Sprint Changes Summary (2026-01-29)

این بخش تغییرات شناسایی شده در Sprint Change Proposal 2026-01-29 را خلاصه می‌کند:

### Navigation Changes
- **از 4 تب به 3 تب:** Profile tab حذف شد و Profile management در Home ادغام شد
- **Bottom Nav:** Home / Tracker / Coach (Profile حذف شده)

### Theme Changes
- **Light Theme:** اضافه شد (قبلاً فقط Dark بود)
- **Theme Toggle:** Component اضافه شد در Home dashboard
- **Firefox Fixes:** مشکلات نمایش در Firefox رفع شد

### UI Integration
- **Profile → Home:** Profile editing section در Home dashboard
- **Weight → Tracker:** Weight logging در Tracker page (حذف `/tracker/weight`)

### Feature Enhancements
- **Calorie Input Validation:** Validation قبل از ارسال به AI
- **Activity Logging:** ثبت فعالیت و کالری مصرفی
- **Macronutrients:** نمایش پروتئین، کربوهیدرات، چربی
- **Past Date Logging:** ثبت کالری برای تاریخ‌های گذشته (تا 30 روز)
- **Daily Calorie Limit:** محاسبه و نمایش کالری مجاز روزانه
- **Charts:** Bar chart (کالری) و Line chart (وزن) با Recharts

### Coach Changes
- **Conversation Memory:** مربی حداقل 20 پیام قبلی را حفظ می‌کند (CRITICAL)
- **Action Buttons Removed:** دکمه‌های "کمک می‌خوام" و "لغزش داشتم" حذف شدند

### Auth Changes
- **Unified Auth Page:** ادغام Signin/Signup/Recover به `/auth`
- **Recovery Flow Removed:** Story 1.6 حذف شد

### Component Updates
- `AppShell + BottomNav`: 3 tabs
- `HomeDashboardCard`: Profile section + Bar chart
- `TrackerLogFoodDialog`: Validation + Past date + Macronutrients
- `CoachChat`: Memory system + No action buttons
- `CalorieLimitBarChart`: New component (Recharts)
- `WeightHistoryLineChart`: New component (Recharts)
- `ThemeToggle`: New component (next-themes)
- `ValidationErrorBanner`: New component
- `UnifiedAuthPage`: New component

---

**Document Status:** Updated with Sprint Changes 2026-01-29