# Inventario · ConnectedAI

Generado por `scripts/inventario-katas.mjs` desde `katas-src/ConnectedAI`. Marca "Leído" al leer cada archivo (las imágenes y diagramas también se leen). Las notas son breves: qué tiene de valor o por qué no lo tiene.

170 archivos · requisitos 3 · documento 26 · ADR 13 · otro 34 · código 51 · pdf u office 10 · datos 10 · imagen 23 · leídos 0

| Archivo | Tipo | KB | Leído | Notas |
|---|---|---|---|---|
| `1_requirements/01-functional-requirements.md` | requisitos | 2 | texto |  |
| `1_requirements/02-non-functional-requirements.md` | requisitos | 1 | texto |  |
| `1_requirements/03-assumptions-and-constraints.md` | requisitos | 1 | texto |  |
| `2_features_and_roadmap/features.md` | documento | 3 | texto |  |
| `2_features_and_roadmap/product-roadmap.md` | documento | 1 | texto |  |
| `3_architecture_and_design/architecture.md` | documento | 3 | texto |  |
| `3_architecture_and_design/c1-system-context.md` | documento | 1 | texto |  |
| `3_architecture_and_design/c2-container-ai-assistant-system.md` | documento | 1 | texto |  |
| `3_architecture_and_design/c2-container-responsible-ai-ml-ops-platform.md` | documento | 1 | texto |  |
| `3_architecture_and_design/c3-component-order-processing-agent.md` | documento | 1 | texto |  |
| `3_architecture_and_design/c3-component-product-attributes-agent.md` | documento | 1 | texto |  |
| `3_architecture_and_design/c3-component-product-comparison-recommendation-agent.md` | documento | 1 | texto |  |
| `3_architecture_and_design/c3-component-product-range-overview-agent.md` | documento | 1 | texto |  |
| `3_architecture_and_design/legend.md` | documento | 1 | texto |  |
| `4_adrs/000_adr_template.md` | ADR | 1 | texto |  |
| `4_adrs/001_adr_nosql_database_storage.md` | ADR | 4 | texto |  |
| `4_adrs/002_adr_pre_trained_models.md` | ADR | 4 | texto |  |
| `4_adrs/003_adr_custom_api_gateway.md` | ADR | 3 | texto |  |
| `4_adrs/004_adr_in_memory_state_session_management.md` | ADR | 3 | texto |  |
| `4_adrs/005_adr_langgraph_framework.md` | ADR | 4 | texto |  |
| `4_adrs/006_adr_hosting.md` | ADR | 4 | texto |  |
| `4_adrs/007_adr_evaulation_framework.md` | ADR | 3 | texto |  |
| `4_adrs/008_adr_authentication_and_authorization.md` | ADR | 4 | texto |  |
| `4_adrs/009_adr_github_actions_ci_cd.md` | ADR | 2 | texto |  |
| `4_adrs/010_adr_caching.md` | ADR | 3 | texto |  |
| `4_adrs/011_adr_containerization.md` | ADR | 4 | texto |  |
| `4_adrs/012_adr_web_socket_implementation.md` | ADR | 3 | texto |  |
| `5_tech_stack/tech-stack.md` | documento | 2 | texto |  |
| `6_test_cases/evaluation.md` | documento | 5 | texto |  |
| `6_test_cases/test-cases.md` | documento | 4 | texto |  |
| `7_deployment/cloud_hosting_instructions.md` | documento | 4 | texto |  |
| `7_deployment/data_preprocessing_loading.md` | documento | 1 | texto |  |
| `7_deployment/local-machine-deployment.md` | documento | 5 | texto |  |
| `8_code/ai-backend/.dockerignore` | otro | 1 |  |  |
| `8_code/ai-backend/.gitignore` | otro | 1 |  |  |
| `8_code/ai-backend/Dockerfile` | otro | 1 |  |  |
| `8_code/ai-backend/Makefile` | otro | 1 |  |  |
| `8_code/ai-backend/README.md` | documento | 2 | texto |  |
| `8_code/ai-backend/core/__init__.py` | código | 1 |  |  |
| `8_code/ai-backend/core/agent/__init__.py` | código | 1 |  |  |
| `8_code/ai-backend/core/agent/base_agent.py` | código | 1 |  |  |
| `8_code/ai-backend/core/agent/google_free_agent.py` | código | 3 |  |  |
| `8_code/ai-backend/core/agent/graph_agent.py` | código | 1 |  |  |
| `8_code/ai-backend/core/agent/mock_agent.py` | código | 1 |  |  |
| `8_code/ai-backend/core/agents/agent_graph.py` | código | 3 |  |  |
| `8_code/ai-backend/core/agents/order_agent/order_agent.py` | código | 6 |  |  |
| `8_code/ai-backend/core/agents/order_agent/order_agent_tools.py` | código | 3 |  |  |
| `8_code/ai-backend/core/agents/product_agent/product_agent_tools.py` | código | 18 |  |  |
| `8_code/ai-backend/core/agents/product_agent/product_attribute_agent.py` | código | 5 |  |  |
| `8_code/ai-backend/core/agents/product_agent/product_comparison_agent.py` | código | 5 |  |  |
| `8_code/ai-backend/core/agents/product_agent/product_mongo_pipelines.py` | código | 6 |  |  |
| `8_code/ai-backend/core/agents/product_agent/product_statistics_agent.py` | código | 5 |  |  |
| `8_code/ai-backend/core/agents/product_agent/product_supervisor.py` | código | 8 |  |  |
| `8_code/ai-backend/core/agents/state/chatbot_state.py` | código | 1 |  |  |
| `8_code/ai-backend/core/agents/supervisor/agent_supervisor.py` | código | 6 |  |  |
| `8_code/ai-backend/core/agents/utility_nodes/nodes.py` | código | 4 |  |  |
| `8_code/ai-backend/core/data_loading/load_order_data.py` | código | 2 |  |  |
| `8_code/ai-backend/core/data_loading/load_product_data.py` | código | 7 |  |  |
| `8_code/ai-backend/core/env.py` | código | 2 |  |  |
| `8_code/ai-backend/core/frontend/__init__.py` | código | 1 |  |  |
| `8_code/ai-backend/core/frontend/app.py` | código | 2 |  |  |
| `8_code/ai-backend/core/frontend/astream_events_handler.py` | código | 3 |  |  |
| `8_code/ai-backend/core/mongodb/utils_mongodb.py` | código | 1 |  |  |
| `8_code/ai-backend/core/notebooks/.gitkeep` | otro | 1 |  |  |
| `8_code/ai-backend/core/notebooks/product_eda.ipynb` | otro | 5 |  |  |
| `8_code/ai-backend/core/notebooks/test_agent.ipynb` | otro | 128 |  |  |
| `8_code/ai-backend/core/preprocessing/preprocess_order_data.py` | código | 1 |  |  |
| `8_code/ai-backend/core/preprocessing/preprocess_product_data.py` | código | 6 |  |  |
| `8_code/ai-backend/core/preprocessing/prompts.py` | código | 5 |  |  |
| `8_code/ai-backend/core/server/__init__.py` | código | 1 |  |  |
| `8_code/ai-backend/core/server/main_server.py` | código | 6 |  |  |
| `8_code/ai-backend/core/test_generation/customer_test_generation.py` | código | 3 |  |  |
| `8_code/ai-backend/core/test_generation/order_test_generation.py` | código | 3 |  |  |
| `8_code/ai-backend/core/test_generation/test_generation_pipeline.py` | código | 3 |  |  |
| `8_code/ai-backend/core/utils/chat_model.py` | código | 4 |  |  |
| `8_code/ai-backend/core/utils/utils_llm.py` | código | 6 |  |  |
| `8_code/ai-backend/core/utils/utils_tools.py` | código | 1 |  |  |
| `8_code/ai-backend/data/eval_sets/return-eligibility-test-set-with-answers-claude-sonnet.xlsx` | pdf u office | 8 |  |  |
| `8_code/ai-backend/data/eval_sets/return-eligibility-test-set-with-answers-gemini.xlsx` | pdf u office | 6 |  |  |
| `8_code/ai-backend/data/eval_sets/return-eligibility-test-set-with-answers-gpt-4o-mini.xlsx` | pdf u office | 7 |  |  |
| `8_code/ai-backend/data/order_data_report.html` | documento | 2035 | texto |  |
| `8_code/ai-backend/data/product_data_report.html` | documento | 4588 | texto |  |
| `8_code/ai-backend/data/test_sets/order-assistance-multiple-items-test-set.xlsx` | pdf u office | 6 |  |  |
| `8_code/ai-backend/data/test_sets/order-history-test-set.xlsx` | pdf u office | 6 |  |  |
| `8_code/ai-backend/data/test_sets/order-status-check-test-set.xlsx` | pdf u office | 6 |  |  |
| `8_code/ai-backend/data/test_sets/return-eligibility-test-set.xlsx` | pdf u office | 6 |  |  |
| `8_code/ai-backend/data/test_sets/shipping-delay-estimate-test-set.xlsx` | pdf u office | 6 |  |  |
| `8_code/ai-backend/data/test_sets/tracking-and-shipping-information-test-set.xlsx` | pdf u office | 6 |  |  |
| `8_code/ai-backend/example/env.example` | otro | 1 |  |  |
| `8_code/ai-backend/example/langfuse-docker/Makefile` | otro | 1 |  |  |
| `8_code/ai-backend/example/langfuse-docker/README.md` | documento | 1 | texto |  |
| `8_code/ai-backend/example/langfuse-docker/docker-composer.yml` | datos | 2 | texto |  |
| `8_code/ai-backend/pyproject.toml` | datos | 1 |  |  |
| `8_code/ai-backend/start_service.py` | código | 1 |  |  |
| `8_code/ai-backend/test/unit/fixture.py` | código | 1 |  |  |
| `8_code/ai-backend/test/unit/test_graph_agent.py` | código | 1 |  |  |
| `8_code/ai-backend/test/unit/test_main_gemini.py` | código | 1 |  |  |
| `8_code/ai-backend/test/unit/test_mock_agent.py` | código | 1 |  |  |
| `8_code/apps/api-server/.env-sample` | otro | 1 |  |  |
| `8_code/apps/api-server/.gitignore` | otro | 1 |  |  |
| `8_code/apps/api-server/.prettierignore` | otro | 1 |  |  |
| `8_code/apps/api-server/.prettierrc` | otro | 1 |  |  |
| `8_code/apps/api-server/Dockerfile` | otro | 1 |  |  |
| `8_code/apps/api-server/README.md` | documento | 1 | texto |  |
| `8_code/apps/api-server/db-load/index.js` | código | 1 |  |  |
| `8_code/apps/api-server/db-load/package.json` | datos | 1 |  |  |
| `8_code/apps/api-server/db-load/user-passwords.csv` | datos | 1 |  |  |
| `8_code/apps/api-server/eslintrc.json` | datos | 1 |  |  |
| `8_code/apps/api-server/package-lock.json` | datos | 150 |  |  |
| `8_code/apps/api-server/package.json` | datos | 1 |  |  |
| `8_code/apps/api-server/server.js` | código | 2 |  |  |
| `8_code/apps/api-server/src/app.js` | código | 1 |  |  |
| `8_code/apps/api-server/src/routes/auth.js` | código | 2 |  |  |
| `8_code/apps/api-server/src/routes/chat.js` | código | 2 |  |  |
| `8_code/apps/app-ui/.gitignore` | otro | 1 |  |  |
| `8_code/apps/app-ui/.prettierignore` | otro | 1 |  |  |
| `8_code/apps/app-ui/.prettierrc` | otro | 1 |  |  |
| `8_code/apps/app-ui/README.md` | documento | 1 | texto |  |
| `8_code/apps/app-ui/eslintrc.json` | datos | 1 |  |  |
| `8_code/apps/app-ui/package-lock.json` | datos | 604 |  |  |
| `8_code/apps/app-ui/package.json` | datos | 1 |  |  |
| `8_code/apps/app-ui/public/index.html` | documento | 1 | texto |  |
| `8_code/apps/app-ui/src/api/apiClient.js` | código | 1 |  |  |
| `8_code/apps/app-ui/src/app.js` | código | 4 |  |  |
| `8_code/apps/app-ui/src/assets/robot.png` | imagen | 341 |  |  |
| `8_code/apps/app-ui/src/assets/robotface.png` | imagen | 181 |  |  |
| `8_code/apps/app-ui/src/assets/robotnew.png` | imagen | 2278 |  |  |
| `8_code/apps/app-ui/src/components/chatComponent.js` | código | 5 |  |  |
| `8_code/apps/app-ui/src/components/loginComponent.js` | código | 3 |  |  |
| `8_code/apps/app-ui/src/index.js` | código | 1 |  |  |
| `LICENSE.md` | documento | 1 | texto |  |
| `README.md` | documento | 10 | texto |  |
| `images/architecture/c1-system-context.png` | imagen | 187 |  |  |
| `images/architecture/c2-container-ai-assistant-system.png` | imagen | 344 |  |  |
| `images/architecture/c2-container-responsible-ai-ml-ops-platform.png` | imagen | 271 |  |  |
| `images/architecture/c3-component-order-processing-agent.png` | imagen | 232 |  |  |
| `images/architecture/c3-component-product-attributes-agent.png` | imagen | 760 |  |  |
| `images/architecture/c3-component-product-comparison-recommendation-agent.png` | imagen | 205 |  |  |
| `images/architecture/c3-component-product-range-overview-aghent.png` | imagen | 166 |  |  |
| `images/architecture/c4-architecture-ai-assistant.pdf` | pdf u office | 609 |  |  |
| `images/architecture/c4-architecture-ai-assistant.png` | imagen | 293 |  |  |
| `images/architecture/c4-architecture-legend.png` | imagen | 104 |  |  |
| `images/common/ai_katas.png` | imagen | 105 |  |  |
| `images/common/robot.png` | imagen | 296 |  |  |
| `images/common/robot_face.png` | imagen | 266 |  |  |
| `images/common/robot_main.png` | imagen | 122 |  |  |
| `images/common/watch_video.png` | imagen | 238 |  |  |
| `images/evaluation/claude_eval.png` | imagen | 83 |  |  |
| `images/evaluation/gemini_eval.png` | imagen | 75 |  |  |
| `images/evaluation/langfuse_tracing.png` | imagen | 69 |  |  |
| `images/evaluation/openai_eval.png` | imagen | 78 |  |  |
| `images/features_and_roadmap/product-roadmap.png` | imagen | 314 |  |  |
| `images/tech_stack/techstack.png` | imagen | 273 |  |  |
| `videos/demo/connectedai_demo.mp4` | otro | 33173 |  |  |
| `videos/tests/issue.mp4` | otro | 285 |  |  |
| `videos/tests/order_customer.mp4` | otro | 586 |  |  |
| `videos/tests/order_customer_wrong.mp4` | otro | 622 |  |  |
| `videos/tests/order_delayed.mp4` | otro | 1267 |  |  |
| `videos/tests/order_eligible_return.mp4` | otro | 418 |  |  |
| `videos/tests/order_guest.mp4` | otro | 432 |  |  |
| `videos/tests/order_shipping_check.mp4` | otro | 442 |  |  |
| `videos/tests/order_shipping_estimate.mp4` | otro | 443 |  |  |
| `videos/tests/product_alternative_suggestions.mp4` | otro | 677 |  |  |
| `videos/tests/product_availability.mp4` | otro | 712 |  |  |
| `videos/tests/product_compare_cameras.mp4` | otro | 1796 |  |  |
| `videos/tests/product_comparison_category.mp4` | otro | 9081 |  |  |
| `videos/tests/product_difference_comparison.mp4` | otro | 509 |  |  |
| `videos/tests/product_nested.mp4` | otro | 712 |  |  |
| `videos/tests/product_ratings_distribution.mp4` | otro | 553 |  |  |
| `videos/tests/product_tv_value.mp4` | otro | 732 |  |  |
