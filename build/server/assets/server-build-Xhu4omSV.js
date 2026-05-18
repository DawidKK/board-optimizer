import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useMemo, useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, TriangleAlert, XIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Separator } from "@base-ui/react/separator";
import { Input } from "@base-ui/react/input";
import { Checkbox } from "@base-ui/react/checkbox";
import { Dialog } from "@base-ui/react/dialog";
import { Select } from "@base-ui/react/select";
import { MaxRectsPacker, PACKING_LOGIC } from "maxrects-packer";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), streamTimeout + 1e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region src/index.css?url
var src_default = "/assets/index-DL8yuh6_.css";
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
function links() {
	return [{
		rel: "stylesheet",
		href: src_default
	}];
}
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "pl",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function AppRoot() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Wystąpił nieoczekiwany błąd.";
	if (isRouteErrorResponse(error)) message = `${error.status} ${error.statusText}`;
	else if (error instanceof Error) message = error.message;
	return /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-background px-4 py-8 text-foreground",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "text-xl font-semibold",
			children: "Błąd aplikacji"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: message
		})]
	});
});
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/alert.tsx
var alertVariants = cva("group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current"
	} },
	defaultVariants: { variant: "default" }
});
function Alert({ className, variant, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert",
		role: "alert",
		className: cn(alertVariants({ variant }), className),
		...props
	});
}
function AlertTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-title",
		className: cn("font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className),
		...props
	});
}
function AlertDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "alert-description",
		className: cn("text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", className),
		...props
	});
}
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
		destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
		outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
		ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
		link: "text-primary underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant = "default", render, ...props }) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps({ className: cn(badgeVariants({ variant }), className) }, props),
		render,
		state: {
			slot: "badge",
			variant
		}
	});
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
	return /* @__PURE__ */ jsx("button", {
		ref,
		type,
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/ui/separator.tsx
function Separator$1({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ jsx(Separator, {
		"data-slot": "separator",
		orientation,
		className: cn("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className),
		...props
	});
}
//#endregion
//#region src/components/ui/card.tsx
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-header",
		className: cn("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-title",
		className: cn("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-content",
		className: cn("px-4 group-data-[size=sm]/card:px-3", className),
		...props
	});
}
//#endregion
//#region src/components/ui/input.tsx
function Input$1({ className, type, ...props }) {
	return /* @__PURE__ */ jsx(Input, {
		type,
		"data-slot": "input",
		className: cn("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region src/components/ui/label.tsx
function Label({ className, ...props }) {
	return /* @__PURE__ */ jsx("label", {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
//#endregion
//#region src/components/BoardForm.tsx
var parseInputNumber$1 = (value) => value === "" ? NaN : Number(value);
var displayInputNumber$1 = (value) => Number.isFinite(value) ? value : "";
function BoardForm({ board, onChange }) {
	return /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Płyta" }), /* @__PURE__ */ jsx(CardDescription, { children: "Ustaw wymiary płyty w milimetrach." })] }), /* @__PURE__ */ jsxs(CardContent, {
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-2",
			children: [/* @__PURE__ */ jsx(Label, {
				htmlFor: "board-width",
				children: "Szerokość (mm)"
			}), /* @__PURE__ */ jsx(Input$1, {
				id: "board-width",
				type: "number",
				min: 1,
				value: displayInputNumber$1(board.width),
				onChange: (event) => onChange({
					...board,
					width: parseInputNumber$1(event.target.value)
				})
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-2",
			children: [/* @__PURE__ */ jsx(Label, {
				htmlFor: "board-height",
				children: "Wysokość (mm)"
			}), /* @__PURE__ */ jsx(Input$1, {
				id: "board-height",
				type: "number",
				min: 1,
				value: displayInputNumber$1(board.height),
				onChange: (event) => onChange({
					...board,
					height: parseInputNumber$1(event.target.value)
				})
			})]
		})]
	})] });
}
//#endregion
//#region src/optimizer/rowColors.ts
var rowPalette = [
	"#ef4444",
	"#22c55e",
	"#3b82f6",
	"#f59e0b",
	"#a855f7",
	"#14b8a6",
	"#ec4899",
	"#84cc16"
];
var getRowColor = (rowNumber) => rowPalette[(Math.max(1, rowNumber) - 1) % rowPalette.length];
//#endregion
//#region src/components/BoardPreview.tsx
function BoardPreview({ board, result }) {
	const canDraw = board.width > 0 && board.height > 0;
	const viewWidth = Math.max(1, board.width);
	const viewHeight = Math.max(1, board.height);
	return /* @__PURE__ */ jsxs(Card, {
		className: "h-full",
		children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Podgląd" }), /* @__PURE__ */ jsx(CardDescription, { children: "Wygenerowane rozmieszczenie i podsumowanie odpadów." })] }), /* @__PURE__ */ jsxs(CardContent, {
			className: "space-y-4",
			children: [!canDraw ? /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Wprowadź poprawne wymiary płyty, aby zobaczyć podgląd."
			}) : /* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: (result?.boards ?? []).map((boardLayout) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-muted/20 p-2",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "mb-1 text-sm font-medium",
							children: ["Płyta ", boardLayout.boardIndex + 1]
						}),
						/* @__PURE__ */ jsxs("svg", {
							className: "h-[min(68vh,560px)] w-full",
							viewBox: `0 0 ${viewWidth} ${viewHeight}`,
							role: "img",
							"aria-label": `Podgląd rozkładu elementów na płycie ${boardLayout.boardIndex + 1}`,
							children: [/* @__PURE__ */ jsx("rect", {
								x: 0,
								y: 0,
								width: board.width,
								height: board.height,
								fill: "#0b1220",
								stroke: "#475569",
								strokeWidth: Math.max(viewWidth, viewHeight) * .005
							}), boardLayout.placed.map((item) => {
								const fill = getRowColor(item.rowNumber);
								const topLabelY = item.y + 14;
								const leftLabelX = item.x + 6;
								const leftLabelY = item.y + item.height / 2;
								return /* @__PURE__ */ jsxs("g", { children: [
									/* @__PURE__ */ jsx("rect", {
										x: item.x,
										y: item.y,
										width: item.width,
										height: item.height,
										fill,
										fillOpacity: .8,
										stroke: "#020617",
										strokeWidth: Math.max(viewWidth, viewHeight) * .002
									}),
									/* @__PURE__ */ jsx("text", {
										x: leftLabelX,
										y: leftLabelY,
										textAnchor: "start",
										dominantBaseline: "middle",
										fontSize: Math.max(9, Math.min(viewWidth, viewHeight) * .016),
										fill: "#000000",
										fontWeight: 700,
										children: `${Math.round(item.height)} mm`
									}),
									/* @__PURE__ */ jsx("text", {
										x: item.x + item.width / 2,
										y: topLabelY,
										textAnchor: "middle",
										dominantBaseline: "middle",
										fontSize: Math.max(9, Math.min(viewWidth, viewHeight) * .016),
										fill: "#000000",
										fontWeight: 700,
										children: `${Math.round(item.width)} mm`
									}),
									/* @__PURE__ */ jsx("text", {
										x: item.x + item.width / 2,
										y: item.y + item.height / 2,
										textAnchor: "middle",
										dominantBaseline: "middle",
										fontSize: Math.max(10, Math.min(viewWidth, viewHeight) * .022),
										fill: "#ffffff",
										fontWeight: 700,
										children: item.itemNumberInRow
									})
								] }, item.instanceId);
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-2 grid grid-cols-1 gap-2 text-sm md:grid-cols-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-md border border-border p-2",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-muted-foreground",
										children: "Wykorzystana powierzchnia"
									}), /* @__PURE__ */ jsxs("p", {
										className: "font-medium",
										children: [Math.round(boardLayout.usedArea), " mm²"]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-md border border-border p-2",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-muted-foreground",
										children: "Odpad"
									}), /* @__PURE__ */ jsxs("p", {
										className: "font-medium",
										children: [Math.round(boardLayout.wasteArea), " mm²"]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-md border border-border p-2",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-muted-foreground",
										children: "Odpad (%)"
									}), /* @__PURE__ */ jsxs("p", {
										className: "font-medium",
										children: [boardLayout.wastePercentage.toFixed(1), "%"]
									})]
								})
							]
						})
					]
				}, boardLayout.boardIndex))
			}), result && /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx(Separator$1, {}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-2 text-sm md:grid-cols-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-md border border-border p-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground",
								children: "Wykorzystana powierzchnia"
							}), /* @__PURE__ */ jsxs("p", {
								className: "font-medium",
								children: [Math.round(result.usedArea), " mm²"]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-md border border-border p-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground",
								children: "Odpad"
							}), /* @__PURE__ */ jsxs("p", {
								className: "font-medium",
								children: [
									Math.round(result.wasteArea),
									" mm² (",
									result.wastePercentage.toFixed(1),
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-md border border-border p-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground",
								children: "Liczba płyt"
							}), /* @__PURE__ */ jsx("p", {
								className: "font-medium",
								children: result.boardCount
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ jsxs(Badge, {
						variant: "secondary",
						children: ["Umieszczone: ", result.placed.length]
					}), /* @__PURE__ */ jsxs(Badge, {
						variant: result.unplaced.length > 0 ? "destructive" : "outline",
						children: ["Nieumieszczone: ", result.unplaced.length]
					})]
				})
			] })]
		})]
	});
}
//#endregion
//#region src/components/ui/checkbox.tsx
function Checkbox$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Checkbox.Root, {
		"data-slot": "checkbox",
		className: cn("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", className),
		...props,
		children: /* @__PURE__ */ jsx(Checkbox.Indicator, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
			children: /* @__PURE__ */ jsx(CheckIcon, {})
		})
	});
}
//#endregion
//#region src/components/ui/dialog.tsx
function Dialog$1({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Root, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Portal, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Backdrop, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(Dialog.Popup, {
		"data-slot": "dialog-content",
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ jsxs(Dialog.Close, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ jsx(XIcon, {}), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "dialog-footer",
		className: cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ jsx(Dialog.Close, {
			render: /* @__PURE__ */ jsx(Button, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Title, {
		"data-slot": "dialog-title",
		className: cn("font-heading text-base leading-none font-medium", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Dialog.Description, {
		"data-slot": "dialog-description",
		className: cn("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
		...props
	});
}
//#endregion
//#region src/components/ui/select.tsx
var Select$1 = Select.Root;
function SelectValue({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.Value, {
		"data-slot": "select-value",
		className: cn("flex flex-1 text-left", className),
		...props
	});
}
function SelectTrigger({ className, size = "default", children, ...props }) {
	return /* @__PURE__ */ jsxs(Select.Trigger, {
		"data-slot": "select-trigger",
		"data-size": size,
		className: cn("flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(Select.Icon, { render: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "pointer-events-none size-4 text-muted-foreground" }) })]
	});
}
function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "center", alignOffset = 0, alignItemWithTrigger = true, ...props }) {
	return /* @__PURE__ */ jsx(Select.Portal, { children: /* @__PURE__ */ jsx(Select.Positioner, {
		side,
		sideOffset,
		align,
		alignOffset,
		alignItemWithTrigger,
		className: "isolate z-50",
		children: /* @__PURE__ */ jsxs(Select.Popup, {
			"data-slot": "select-content",
			"data-align-trigger": alignItemWithTrigger,
			className: cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props,
			children: [
				/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
				/* @__PURE__ */ jsx(Select.List, { children }),
				/* @__PURE__ */ jsx(SelectScrollDownButton, {})
			]
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(Select.Item, {
		"data-slot": "select-item",
		className: cn("relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
		...props,
		children: [/* @__PURE__ */ jsx(Select.ItemText, {
			className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
			children
		}), /* @__PURE__ */ jsx(Select.ItemIndicator, {
			render: /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
			children: /* @__PURE__ */ jsx(CheckIcon, { className: "pointer-events-none" })
		})]
	});
}
function SelectScrollUpButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.ScrollUpArrow, {
		"data-slot": "select-scroll-up-button",
		className: cn("top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
	});
}
function SelectScrollDownButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select.ScrollDownArrow, {
		"data-slot": "select-scroll-down-button",
		className: cn("bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: /* @__PURE__ */ jsx(ChevronDownIcon, {})
	});
}
//#endregion
//#region src/components/ui/table.tsx
function Table({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ jsx("table", {
			"data-slot": "table",
			className: cn("w-full caption-bottom text-sm", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("thead", {
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ jsx("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ jsx("tr", {
		"data-slot": "table-row",
		className: cn("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ jsx("th", {
		"data-slot": "table-head",
		className: cn("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ jsx("td", {
		"data-slot": "table-cell",
		className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
//#endregion
//#region src/components/ElementsForm.tsx
var parseInputNumber = (value) => value === "" ? NaN : Number(value);
var displayInputNumber = (value) => Number.isFinite(value) ? value : "";
var createElementId = () => typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
function ElementsForm({ elements, onChange }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [draft, setDraft] = useState({
		width: 300,
		height: 200,
		quantity: 1
	});
	const update = (id, key, value) => {
		onChange(elements.map((item) => item.id === id ? {
			...item,
			[key]: value
		} : item));
	};
	const remove = (id) => onChange(elements.filter((item) => item.id !== id));
	const add = () => onChange([...elements, {
		id: createElementId(),
		...draft
	}]);
	return /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
		className: "flex flex-row items-start justify-between gap-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ jsx(CardTitle, { children: "Elementy" }), /* @__PURE__ */ jsx(CardDescription, { children: "Prostokąty do wycięcia z płyty." })]
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "secondary",
			onClick: () => setIsDialogOpen(true),
			children: "Dodaj element"
		})]
	}), /* @__PURE__ */ jsxs(CardContent, {
		className: "space-y-4",
		children: [/* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
			/* @__PURE__ */ jsx(TableHead, { children: "Wiersz" }),
			/* @__PURE__ */ jsx(TableHead, { children: "Szerokość" }),
			/* @__PURE__ */ jsx(TableHead, { children: "Wysokość" }),
			/* @__PURE__ */ jsx(TableHead, { children: "Ilość" }),
			/* @__PURE__ */ jsx(TableHead, {
				className: "text-right",
				children: "Akcje"
			})
		] }) }), /* @__PURE__ */ jsx(TableBody, { children: elements.map((item, rowIndex) => /* @__PURE__ */ jsxs(TableRow, { children: [
			/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "inline-block size-3 rounded-full",
					style: { backgroundColor: getRowColor(rowIndex + 1) }
				}), /* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: rowIndex + 1
				})]
			}) }),
			/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Input$1, {
				type: "number",
				min: 1,
				value: displayInputNumber(item.width),
				onChange: (event) => update(item.id, "width", parseInputNumber(event.target.value))
			}) }),
			/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Input$1, {
				type: "number",
				min: 1,
				value: displayInputNumber(item.height),
				onChange: (event) => update(item.id, "height", parseInputNumber(event.target.value))
			}) }),
			/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Input$1, {
				type: "number",
				min: 1,
				value: displayInputNumber(item.quantity),
				onChange: (event) => update(item.id, "quantity", parseInputNumber(event.target.value))
			}) }),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-right",
				children: /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "destructive",
					size: "sm",
					onClick: () => remove(item.id),
					children: "Usuń"
				})
			})
		] }, item.id)) })] }), /* @__PURE__ */ jsx(Dialog$1, {
			open: isDialogOpen,
			onOpenChange: setIsDialogOpen,
			children: /* @__PURE__ */ jsxs(DialogContent, { children: [
				/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Dodaj element" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Wprowadź wymiary nowego prostokątnego elementu." })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 py-1",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "new-width",
								children: "Szerokość (mm)"
							}), /* @__PURE__ */ jsx(Input$1, {
								id: "new-width",
								type: "number",
								min: 1,
								value: displayInputNumber(draft.width),
								onChange: (event) => setDraft((current) => ({
									...current,
									width: parseInputNumber(event.target.value)
								}))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "new-height",
								children: "Wysokość (mm)"
							}), /* @__PURE__ */ jsx(Input$1, {
								id: "new-height",
								type: "number",
								min: 1,
								value: displayInputNumber(draft.height),
								onChange: (event) => setDraft((current) => ({
									...current,
									height: parseInputNumber(event.target.value)
								}))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "new-quantity",
								children: "Ilość"
							}), /* @__PURE__ */ jsx(Input$1, {
								id: "new-quantity",
								type: "number",
								min: 1,
								value: displayInputNumber(draft.quantity),
								onChange: (event) => setDraft((current) => ({
									...current,
									quantity: parseInputNumber(event.target.value)
								}))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Jednostka" }), /* @__PURE__ */ jsxs(Select$1, {
								defaultValue: "mm",
								disabled: true,
								children: [/* @__PURE__ */ jsx(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Wybierz jednostkę" })
								}), /* @__PURE__ */ jsx(SelectContent, { children: /* @__PURE__ */ jsx(SelectItem, {
									value: "mm",
									children: "Milimetry"
								}) })]
							})]
						}),
						/* @__PURE__ */ jsxs(Label, {
							className: "gap-3",
							children: [/* @__PURE__ */ jsx(Checkbox$1, {
								checked: false,
								disabled: true
							}), "Obrót wyłączony w MVP"]
						})
					]
				}),
				/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setIsDialogOpen(false),
					children: "Anuluj"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					onClick: () => {
						add();
						setIsDialogOpen(false);
					},
					children: "Dodaj"
				})] })
			] })
		})]
	})] });
}
//#endregion
//#region src/optimizer/packBoard.ts
var isPositive = (value) => Number.isFinite(value) && value > 0;
var BOARD_COUNT_WEIGHT = 1e6;
var WASTE_AREA_WEIGHT = 1;
var SMALL_RECTS_WEIGHT = 2;
var FREE_RECTS_COUNT_WEIGHT = 5e3;
var LARGEST_FREE_RECT_BONUS = .6;
var expandElements = (elements) => elements.flatMap((element, rowIndex) => {
	const quantity = Math.max(0, Math.floor(element.quantity || 0));
	return Array.from({ length: quantity }, (_, index) => ({
		instanceId: `${element.id}-${index + 1}`,
		sourceId: element.id,
		rowNumber: rowIndex + 1,
		itemNumberInRow: index + 1,
		width: element.width,
		height: element.height
	}));
});
var sortExpanded = (source, strategy) => {
	const sorted = [...source];
	sorted.sort((a, b) => {
		const aArea = a.width * a.height;
		const bArea = b.width * b.height;
		const aLongest = Math.max(a.width, a.height);
		const bLongest = Math.max(b.width, b.height);
		const aShortest = Math.min(a.width, a.height);
		const bShortest = Math.min(b.width, b.height);
		const aRatio = aLongest / aShortest;
		const bRatio = bLongest / bShortest;
		const diff = strategy === "area" ? bArea - aArea : strategy === "longest-edge" ? bLongest - aLongest : strategy === "shortest-edge" ? bShortest - aShortest : bRatio - aRatio;
		if (diff !== 0) return diff;
		return a.instanceId.localeCompare(b.instanceId);
	});
	return sorted;
};
var emptyQualityMetrics = {
	score: 0,
	boardsCount: 0,
	smallRectsArea: 0,
	freeRectCount: 0,
	largestFreeRectArea: 0
};
var buildResultFromPacker = (singleBoardArea, expanded, packer) => {
	const packedSet = /* @__PURE__ */ new Set();
	const smallRectThreshold = singleBoardArea * .05;
	const boards = packer.bins.map((bin, boardIndex) => {
		const placed = bin.rects.map((rect) => {
			if (rect.oversized) return null;
			const item = rect.data;
			if (!item) return null;
			packedSet.add(item.instanceId);
			return {
				instanceId: item.instanceId,
				sourceId: item.sourceId,
				rowNumber: item.rowNumber,
				itemNumberInRow: item.itemNumberInRow,
				boardIndex,
				rotated: Boolean(rect.rot),
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height
			};
		}).filter((item) => item !== null);
		const freeRectAreas = bin.freeRects.map((rect) => rect.width * rect.height);
		const largestFreeRectArea = freeRectAreas.length > 0 ? Math.max(...freeRectAreas) : 0;
		const smallRectsArea = freeRectAreas.reduce((sum, area) => sum + (area < smallRectThreshold ? area : 0), 0);
		const freeRectCount = bin.freeRects.length;
		const usedArea = placed.reduce((sum, item) => sum + item.width * item.height, 0);
		const boardArea = singleBoardArea;
		const wasteArea = Math.max(0, boardArea - usedArea);
		return {
			boardIndex,
			placed,
			boardArea,
			usedArea,
			wasteArea,
			wastePercentage: boardArea > 0 ? wasteArea / boardArea * 100 : 0,
			largestFreeRectArea,
			smallRectsArea,
			freeRectCount
		};
	}).filter((boardLayout) => boardLayout.placed.length > 0);
	const placed = boards.flatMap((boardLayout) => boardLayout.placed);
	const unplaced = expanded.filter((item) => !packedSet.has(item.instanceId));
	const boardCount = boards.length;
	const boardArea = boardCount * singleBoardArea;
	const usedArea = placed.reduce((sum, item) => sum + item.width * item.height, 0);
	const wasteArea = Math.max(0, boardArea - usedArea);
	const wastePercentage = boardArea > 0 ? wasteArea / boardArea * 100 : 0;
	const totalSmallRectsArea = boards.reduce((sum, boardLayout) => sum + boardLayout.smallRectsArea, 0);
	const totalFreeRectCount = boards.reduce((sum, boardLayout) => sum + boardLayout.freeRectCount, 0);
	const largestFreeRectArea = boards.reduce((maxArea, boardLayout) => Math.max(maxArea, boardLayout.largestFreeRectArea), 0);
	return {
		boards,
		boardCount,
		placed,
		unplaced,
		boardArea,
		usedArea,
		wasteArea,
		wastePercentage,
		qualityMetrics: {
			score: boardCount * BOARD_COUNT_WEIGHT + wasteArea * WASTE_AREA_WEIGHT + totalSmallRectsArea * SMALL_RECTS_WEIGHT + totalFreeRectCount * FREE_RECTS_COUNT_WEIGHT - largestFreeRectArea * LARGEST_FREE_RECT_BONUS,
			boardsCount: boardCount,
			smallRectsArea: totalSmallRectsArea,
			freeRectCount: totalFreeRectCount,
			largestFreeRectArea
		}
	};
};
var packBoard = (board, elements) => {
	const singleBoardArea = Math.max(0, board.width * board.height);
	if (!isPositive(board.width) || !isPositive(board.height)) return {
		boards: [],
		boardCount: 0,
		placed: [],
		unplaced: [],
		boardArea: singleBoardArea,
		usedArea: 0,
		wasteArea: singleBoardArea,
		wastePercentage: 100,
		qualityMetrics: emptyQualityMetrics
	};
	const expanded = expandElements(elements).filter((item) => isPositive(item.width) && isPositive(item.height));
	if (expanded.length === 0) return {
		boards: [],
		boardCount: 0,
		placed: [],
		unplaced: [],
		boardArea: 0,
		usedArea: 0,
		wasteArea: 0,
		wastePercentage: 0,
		qualityMetrics: emptyQualityMetrics
	};
	const sortStrategies = [
		"area",
		"longest-edge",
		"shortest-edge",
		"ratio"
	];
	const logicStrategies = [PACKING_LOGIC.MAX_EDGE, PACKING_LOGIC.MAX_AREA];
	const results = [];
	for (const sortStrategy of sortStrategies) for (const logic of logicStrategies) {
		const packer = new MaxRectsPacker(board.width, board.height, 0, {
			smart: false,
			pot: false,
			square: false,
			allowRotation: true,
			logic
		});
		const sorted = sortExpanded(expanded, sortStrategy);
		for (const item of sorted) packer.add(item.width, item.height, item);
		results.push(buildResultFromPacker(singleBoardArea, expanded, packer));
	}
	return results.reduce((best, current) => {
		if (current.qualityMetrics.score < best.qualityMetrics.score) return current;
		if (current.qualityMetrics.score > best.qualityMetrics.score) return best;
		if (current.boardCount < best.boardCount) return current;
		if (current.boardCount > best.boardCount) return best;
		return current.wasteArea < best.wasteArea ? current : best;
	});
};
//#endregion
//#region src/App.tsx
var initialBoard = {
	width: 2500,
	height: 1250
};
var initialElements = [
	{
		id: "row-1",
		width: 600,
		height: 400,
		quantity: 2
	},
	{
		id: "row-2",
		width: 800,
		height: 300,
		quantity: 2
	},
	{
		id: "row-3",
		width: 450,
		height: 250,
		quantity: 3
	}
];
function BoardOptimizerPage() {
	const [board, setBoard] = useState(initialBoard);
	const [elements, setElements] = useState(initialElements);
	const [result, setResult] = useState(null);
	const totalItems = useMemo(() => elements.reduce((sum, item) => sum + Math.max(0, Math.floor(item.quantity || 0)), 0), [elements]);
	const handleOptimize = () => {
		setResult(packBoard(board, elements));
	};
	return /* @__PURE__ */ jsx("main", {
		className: "dark min-h-screen bg-background text-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8",
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
							children: "Optymalizacja rozkroju"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "text-3xl font-semibold tracking-tight md:text-4xl",
							children: "Board Optimizer"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "max-w-2xl text-sm text-muted-foreground md:text-base",
							children: "Prosty planer rozkroju dla wielu płyt OSB. Wpisz wymiary, uruchom optymalizację i sprawdź rozmieszczenie oraz odpady."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Badge, {
								variant: "secondary",
								children: "Wiele płyt (1..N)"
							}), /* @__PURE__ */ jsx(Badge, {
								variant: "outline",
								children: "Obrót 90° włączony"
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx(Separator$1, {}),
				/* @__PURE__ */ jsxs("section", {
					className: "flex flex-col gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-6 xl:grid-cols-2",
							children: [/* @__PURE__ */ jsx(BoardForm, {
								board,
								onChange: setBoard
							}), /* @__PURE__ */ jsx(ElementsForm, {
								elements,
								onChange: setElements
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								onClick: handleOptimize,
								children: "Optymalizuj"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-sm text-muted-foreground",
								children: ["Łączna liczba elementów: ", totalItems]
							})]
						}),
						result && result.unplaced.length > 0 && /* @__PURE__ */ jsxs(Alert, {
							variant: "destructive",
							children: [
								/* @__PURE__ */ jsx(TriangleAlert, {}),
								/* @__PURE__ */ jsx(AlertTitle, { children: "Nieumieszczone elementy" }),
								/* @__PURE__ */ jsx(AlertDescription, { children: /* @__PURE__ */ jsx("ul", {
									className: "list-inside list-disc",
									children: result.unplaced.map((item) => /* @__PURE__ */ jsxs("li", { children: [
										"Wiersz ",
										item.rowNumber,
										", element ",
										item.itemNumberInRow,
										": ",
										item.width,
										" x",
										" ",
										item.height,
										" mm"
									] }, item.instanceId))
								}) })
							]
						}),
						/* @__PURE__ */ jsx(BoardPreview, {
							board,
							result
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({ default: () => home_default });
var home_default = UNSAFE_withComponentProps(function HomeRoute() {
	return /* @__PURE__ */ jsx(BoardOptimizerPage, {});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-Crj_W21J.js",
		"imports": ["/assets/jsx-runtime-BzoKEBw9.js", "/assets/react-dom-TMmxsl9z.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-DHsC0vkq.js",
			"imports": ["/assets/jsx-runtime-BzoKEBw9.js", "/assets/react-dom-TMmxsl9z.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-DH70O2av.js",
			"imports": ["/assets/jsx-runtime-BzoKEBw9.js", "/assets/react-dom-TMmxsl9z.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-2e9af3f7.js",
	"version": "2e9af3f7",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var server_build_exports = /* @__PURE__ */ __exportAll({
	allowedActionOrigins: () => false,
	assets: () => server_manifest_default,
	assetsBuildDirectory: () => assetsBuildDirectory,
	basename: () => "/",
	entry: () => entry,
	future: () => future,
	isSpaMode: () => false,
	prerender: () => prerender,
	publicPath: () => "/",
	routeDiscovery: () => routeDiscovery,
	routes: () => routes,
	ssr: () => true
});
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"v8_passThroughRequests": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { future as a, publicPath as c, server_build_exports as d, ssr as f, entry as i, routeDiscovery as l, assetsBuildDirectory as n, isSpaMode as o, server_manifest_default as p, basename as r, prerender as s, allowedActionOrigins as t, routes as u };
