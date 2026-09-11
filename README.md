# kannav-benchmark

Up-to-date opinions on which model to use for what task and why

Updated: 2026-09-11

Source of truth: models.json. Edit that file, then run `node scripts/render-readme.mjs`.

| Roles | Model | OpenRouter | In $/M | Out $/M | Cache $/M | Reasoning | Rationale |
| --- | --- | --- | --- | --- | --- | --- | --- |
| coding, api-power, browser | GPT-5.6 Sol | openai/gpt-5.6-sol | 2 | 10 | 0.2 | medium or high | Main coding model. Also API/graph when more power needed, and browser work (with Luna). |
| research | GPT-6 Astra | openai/gpt-6-astra | 10 | 50 | 1 | high (senior-architect depth) | Code research / senior-architect reads. Deep analysis, not day-to-day coding. |
| api/graph, browser | GPT-5.6 Luna | openai/gpt-5.6-luna | 0.2 | 1.2 | 0.02 | medium | Default for API or graph work. Also browser (with Sol). |
| api/graph | DeepSeek V4.1 Flash | deepseek/deepseek-v4.1-flash | 0.15 | 0.6 | 0.003 | testing | Currently testing as cheaper alternative for API/graph work. |
| chinese, api-power | Kimi K2.7 Code | moonshotai/kimi-k2.7-code | 0.68 | 3.4 | 0.136 | always-on thinking | Chinese / extra API power when Sol isn't enough. Always-thinking coding model. |
| image | GPT Image 2.5 Sunburst | openai/gpt-image-2.5-sunburst | 5 | 30 | 2 | n/a (image) | Image gen/edit (new GPT Image 2.5). Prices are text-in $5/M and image-out $30/M on OpenRouter. |
