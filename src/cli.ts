#!/usr/bin/env node

import "dotenv/config"
import React from "react"
import {render} from "ink"
import { registerTelemetry } from "ai"
import { LaminarAiSdkTelemetry } from "@lmnr-ai/lmnr"
import { App } from "./ui/index.tsx"

registerTelemetry(new LaminarAiSdkTelemetry())

render(React.createElement(App))
