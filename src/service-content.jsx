// 已確認的服務範圍、產品用途與試驗紀錄。新增成效數據前須先核對檢測資料。
const detailPages = {
    mc2: { key: 'mc2', label: 'MC2 金屬捕集劑', title: 'MC2 金屬捕集劑｜重金屬廢水處理評估', sub: '產品用途與水樣評估', icon: 'flask-conical', file: 'mc2-metal-capture.html' },
    nickel: { key: 'nickel', label: '化學鎳廢液案例', title: '化學鎳廢液處理｜MC2 金屬捕集試驗', sub: '廢水處理試驗紀錄', icon: 'flask-conical', file: 'chemical-nickel-treatment.html', variant: 'nickel' },
    zinc: { key: 'zinc', label: '鋅鎳合金鍍液案例', title: '鋅鎳合金鍍液處理｜破螯合與金屬捕集', sub: '廢水處理試驗紀錄', icon: 'flask-conical', file: 'zinc-nickel-treatment.html', variant: 'zinc' },
    cyanide: { key: 'cyanide', label: '含氰廢水案例', title: '高濃度氰化物廢水處理｜反應與沉澱紀錄', sub: '廢水處理試驗紀錄', icon: 'flask-conical', file: 'cyanide-wastewater-treatment.html', variant: 'cyanide' }
};

const assessmentItems = {
    wastewater: ['製程與廢水來源，例如化學鎳、鋅鎳合金鍍液或振動研磨排水。', '每日處理量、批次量，以及原水 pH、COD、金屬等既有檢測報告。', '現行加藥流程、使用藥劑與處理設備照片。', '想改善的問題與目標，例如金屬殘留、沉澱分離或操作穩定性。'],
    sludge: ['污泥來源與現有處理流程，以及目前使用的調理藥劑。', '每日或每批次產量、含水率及污泥特性；未知項目可先提供現況。', '現有脫水設備、泥餅外觀與操作問題的照片。', '可用空間、現場電力與後續乾燥、裝袋等需求。']
};

const serviceQuestions = {
    wastewater: [
        ['新北、台中的工廠可以如何開始評估？', '可先提供製程、廢水量、檢測報告及設備照片，透過電話或詢問表單聯繫。再依資料討論水樣試驗及現場評估的安排。'],
        ['只有藥劑需求，也能詢問嗎？', '可以。先說明現有處理流程、目前使用的藥劑與想改善的問題，協助判斷需評估藥劑搭配，或連同沉澱與設備流程一起調整。'],
        ['看到沉澱分層，就代表處理後可以排放嗎？', '照片只能呈現反應外觀。污染物濃度與排放要求仍需依水質檢測確認，實際方案與用量需以水樣試驗及現場條件評估。']
    ],
    sludge: [
        ['污泥處理與汙泥處理是相同服務嗎？', '這裡的「污泥」與「汙泥」指同一類處理需求。本公司的服務重點是污泥脫水、乾燥與設備整合，詢問時請說明污泥來源及預期改善項目。'],
        ['脫水機與烘箱要如何選擇？', '先依污泥特性、含水率、產量及現有流程，評估機械脫水的適用方式；再依後續需求評估乾燥設備。不能只以照片或單一規格決定。'],
        ['可以直接用污泥重量估算設備嗎？', '重量是評估的一部分，還需要含水率、批次時間、調理方式與現場空間等資訊。可先提供現況，再討論設備規格及運轉條件。']
    ]
};

const ServiceArea = ({ compact = false }) => <section aria-label="服務地區" className={compact ? 'mb-8 rounded-xl bg-white border border-clarity/20 p-5 md:p-7' : 'bg-white border-y border-steel/15 py-12 md:py-16'}>
    <div className={compact ? '' : 'max-w-6xl mx-auto px-6'}>
        <div className="flex flex-wrap items-center gap-3 mb-3"><span className="text-sm font-semibold text-clarity">主要服務地區</span>{['新北市', '台中市'].map(city => <span key={city} className="inline-flex rounded-full bg-clarity/10 text-clarity px-4 py-2 text-sm font-medium">{city}</span>)}</div>
        {!compact && <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-4">新北、台中工廠的廢水與污泥處理需求</h2>}
        <p className="text-base text-steel leading-relaxed">台灣雷德斯減廢科技主要服務新北市與台中市，提供工業廢水處理藥劑、污泥處理設備及人機自動化整合。依水質、處理量與現有設備評估方案，現場服務安排請先聯繫確認。</p>
        {!compact && <div className="flex flex-wrap gap-4 mt-6"><a className="text-clarity font-semibold underline underline-offset-4" href="./wastewater.html">了解工業廢水處理</a><a className="text-clarity font-semibold underline underline-offset-4" href="./sludge.html">了解污泥脫水與乾燥設備</a><a className="text-clarity font-semibold underline underline-offset-4" href="./automation.html">了解 PLC 人機自動化</a></div>}
    </div>
</section>;

const AssessmentPanel = ({ kind = 'wastewater', onContact }) => <section className="my-10 md:my-14 rounded-xl bg-ink text-mist p-6 md:p-10" aria-label="處理方案評估">
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div><span className="text-sm font-medium text-clarity-light block mb-3">從現況開始評估</span><h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">詢問前，先準備這些資料</h2><p className="text-base text-mist/80 leading-relaxed mb-6">沒有完整報告也可以先聯繫，從目前能提供的資料開始討論。</p><button type="button" onClick={onContact} className="bg-clarity-light text-ink rounded-lg px-5 py-3 font-semibold">諮詢{kind === 'sludge' ? '污泥處理設備' : '廢水處理方案'}</button></div>
        <ul className="space-y-4">{assessmentItems[kind].map(item => <li key={item} className="flex items-start gap-3 text-base leading-relaxed"><Icon name="check" size={18} className="text-clarity-light shrink-0 mt-1" /><span>{item}</span></li>)}</ul>
    </div>
</section>;

const ServiceOverview = ({ kind }) => {
    const sludge = kind === 'sludge';
    const cards = sludge ? [
        ['機械脫水', '評估污泥調理、入料與加壓成形流程，搭配 HPF-800 中高壓污泥脫水機等設備。'],
        ['後段乾燥', '依泥餅狀態及後續需求，評估 SD-500 污泥烘箱與乾燥條件。'],
        ['流程整合', '一起考量脫水、乾燥、裝袋與人機操作介面，依可用空間規劃配置。']
    ] : [
        ['藥劑搭配評估', '依污染物與既有流程，討論氧化、混凝及 MC2 金屬捕集等藥劑的適用方向。'],
        ['水樣反應試驗', '觀察反應、沉澱與分層，並以檢測資料確認污染物變化，作為方案評估依據。'],
        ['設備與控制整合', '連同沉澱、過濾及現場控制需求評估，銜接既有廢水處理系統。']
    ];
    return <section className="mb-12"><ServiceArea compact /><h2 className="font-serif text-2xl font-bold text-ink-text mb-4">{sludge ? '污泥減量，從脫水與乾燥流程一起評估' : '工業廢水處理，從水質到設備一起評估'}</h2><p className="text-base text-steel leading-relaxed mb-6">{sludge ? '新北、台中工廠若有污泥含水率、泥餅成形或乾燥流程的改善需求，可先提供污泥來源與現有設備。本公司著重處理設備與流程評估，依現場條件討論適用配置。' : '高 COD、重金屬、化學鎳與鋅鎳合金鍍液等工業廢水，處理條件各不相同。先了解製程來源、污染物與現行操作，才能評估需要調整藥劑、加強沉澱分離，或搭配設備改善。'}</p><div className="grid md:grid-cols-3 gap-4">{cards.map(([title, text]) => <article key={title} className="rounded-xl border border-steel/15 bg-white p-6"><h3 className="font-semibold text-lg text-ink-text mb-3">{title}</h3><p className="text-base text-steel leading-relaxed">{text}</p></article>)}</div></section>;
};

const ServiceFAQ = ({ kind }) => <section className="my-12" aria-label="常見問題"><h2 className="font-serif text-2xl font-bold text-ink-text mb-5">{kind === 'sludge' ? '污泥處理設備' : '工業廢水處理'}常見問題</h2><div className="divide-y divide-steel/15 rounded-xl border border-steel/15 bg-white px-5 md:px-7">{serviceQuestions[kind].map(([q, a]) => <details key={q} className="py-5"><summary className="cursor-pointer font-semibold text-base text-ink-text">{q}</summary><p className="mt-4 text-base text-steel leading-relaxed">{a}</p></details>)}</div></section>;

const KnowledgeLinks = ({ exclude, heading = '藥劑與處理案例' }) => <section className="my-12" aria-label={heading}><h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-4">{heading}</h2><p className="text-base text-steel leading-relaxed mb-6">從產品用途與實際反應照片，了解不同廢水的評估方向。</p><div className="grid sm:grid-cols-2 gap-4">{Object.values(detailPages).filter(p => p.key !== exclude).map(page => <a key={page.key} href={'./' + page.file} className="block rounded-xl bg-white border border-steel/20 p-6 hover:border-clarity transition-colors"><span className="block text-sm text-clarity font-medium mb-2">{page.sub}</span><h3 className="text-lg font-semibold text-ink-text mb-2">{page.label}</h3><span className="text-base text-clarity underline underline-offset-4">查看完整介紹</span></a>)}</div></section>;

const MC2Page = ({ onContact }) => <div>
    <div className="grid md:grid-cols-2 gap-8 items-center mb-10"><div><p className="text-base md:text-lg text-steel leading-relaxed mb-5">MC2 是雷德斯的液態金屬捕集劑，用於工業廢水中金屬污染物的捕集處理評估。實際使用需依金屬種類、濃度、螯合狀態與現有流程進行水樣試驗。</p><p className="text-base text-steel leading-relaxed mb-6">在鋅鎳合金鍍液試驗中，先以氧化劑搭配輔助藥劑破除原液螯合，再加入 MC2 捕集剩餘金屬，最後觀察沉澱分層。</p><button type="button" onClick={onContact} className="rounded-lg bg-clarity text-white px-5 py-3 font-semibold">詢問 MC2 適用性與樣品</button></div><figure className="rounded-xl bg-white border border-steel/15 p-6"><img src="./assets/image-c3efc47922be.webp" width="480" height="400" alt="雷德斯 TRT-MC2 液態金屬捕集劑產品照片" className="w-full h-72 md:h-80 object-contain" decoding="async" /><figcaption className="text-center text-sm text-steel mt-4">TRT-MC2 金屬捕集劑</figcaption></figure></div>
    <ServiceArea compact />
    <section className="my-12"><h2 className="font-serif text-2xl font-bold text-ink-text mb-5">哪些需求可以先做水樣評估？</h2><div className="grid md:grid-cols-2 gap-5">{[['化學鎳廢液', '已提供原水、加入 MC2、靜置與沉澱分層的照片紀錄。先了解原液特性，再討論金屬捕集方案。', 'chemical-nickel-treatment.html'], ['鋅鎳合金鍍液', '含螯合成分的原液，需一起評估前處理與後續金屬捕集，不能只以增加捕集劑用量判斷。', 'zinc-nickel-treatment.html']].map(([title, text, href]) => <article key={title} className="rounded-xl bg-white p-6 border border-steel/15"><h3 className="text-lg font-semibold mb-3">{title}</h3><p className="text-base text-steel leading-relaxed mb-4">{text}</p><a href={'./' + href} className="text-clarity underline underline-offset-4">查看實際試驗紀錄</a></article>)}</div></section>
    <section className="rounded-xl bg-white p-6 md:p-8 border border-steel/15"><h2 className="font-serif text-2xl font-bold text-ink-text mb-4">評估時要確認的三件事</h2><ul className="list-disc pl-5 space-y-3 text-base text-steel leading-relaxed"><li>原水金屬種類、濃度及可能影響反應的螯合成分。</li><li>前處理藥劑、沉澱分離方式與既有設備的配合。</li><li>反應前後的水質檢測；外觀澄清不能替代金屬濃度檢測。</li></ul></section>
    <AssessmentPanel onContact={onContact} /><ServiceFAQ kind="wastewater" /><KnowledgeLinks exclude="mc2" />
</div>;

const CaseDetailPage = ({ variant, onContact }) => {
    const item = wastewaterTestCases[variant];
    const focus = {
        nickel: '本次紀錄聚焦於化學鎳廢液加入 MC2 後的外觀與沉澱變化，作為討論金屬捕集及固液分離的參考。',
        zinc: '本次紀錄聚焦於含螯合成分的鋅鎳合金鍍液，從依線上比例稀釋、氧化破螯合，到 MC2 金屬捕集與沉澱分層。',
        cyanide: '本次紀錄聚焦於高濃度氰化物廢水的階段反應，呈現反應劑添加、pH 調整及沉澱分層的外觀。藥劑名稱、用量與目標 pH 未在此案例公開。'
    };
    return <article>
        <p className="text-base md:text-lg text-steel leading-relaxed mb-6">{item.description}</p>
        <div className="rounded-xl bg-white border border-steel/15 p-6 md:p-8 mb-10"><h2 className="font-serif text-2xl font-bold text-ink-text mb-4">這個試驗在觀察什麼？</h2><p className="text-base text-steel leading-relaxed mb-4">{focus[variant]}</p><p className="text-base text-ink-text"><strong>本次使用藥劑：</strong>{item.reagents}</p></div>
        <section aria-label="完整反應照片與說明"><h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-text mb-5">依實際順序，查看完整反應過程</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{item.steps.map((step, i) => <figure key={step.photo} className="bg-white rounded-xl border border-steel/15 overflow-hidden"><div className="bg-mist p-4"><img src={item.prefix + step.photo + '.webp'} alt={item.title + '，' + step.title + '：' + step.description} loading={i > 1 ? 'lazy' : 'eager'} decoding="async" width="480" height="480" className="w-full h-72 object-contain" /></div><figcaption className="p-5"><span className="text-sm text-clarity font-medium">階段 {i + 1}</span><h3 className="text-lg font-semibold text-ink-text my-2">{step.title}</h3><p className="text-base text-steel leading-relaxed">{step.description}</p></figcaption></figure>)}</div></section>
        <section className="my-10 rounded-xl border border-sediment/30 bg-white p-6 md:p-8"><h2 className="font-serif text-2xl font-bold text-ink-text mb-4">照片觀察與檢測結果，需要分開判讀</h2><p className="text-base text-steel leading-relaxed">本案例呈現單次試驗的反應外觀，未提供完整檢測數據，不能據此判定去除率或排放達標。實際方案需依水樣、原水條件及檢測報告評估，圖文不是現場加藥操作指引。</p></section>
        <ServiceArea compact /><AssessmentPanel onContact={onContact} />
        <div className="flex flex-wrap gap-5"><a href="./wastewater.html" className="text-clarity underline underline-offset-4 font-semibold">返回工業廢水處理服務</a>{variant !== 'cyanide' && <a href="./mc2-metal-capture.html" className="text-clarity underline underline-offset-4 font-semibold">了解 MC2 金屬捕集劑</a>}</div>
        <KnowledgeLinks exclude={variant} heading="延伸閱讀：產品與其他案例" />
    </article>;
};
