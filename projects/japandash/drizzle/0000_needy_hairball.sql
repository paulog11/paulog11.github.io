CREATE TABLE "mistakes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text DEFAULT 'local' NOT NULL,
	"user_text" text NOT NULL,
	"correction" text NOT NULL,
	"source" text DEFAULT 'conversation' NOT NULL,
	"scenario" text,
	"level" text,
	"review_item_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text DEFAULT 'local' NOT NULL,
	"type" text NOT NULL,
	"payload" jsonb NOT NULL,
	"due" timestamp with time zone DEFAULT now() NOT NULL,
	"interval_days" real DEFAULT 0 NOT NULL,
	"ease" real DEFAULT 2.5 NOT NULL,
	"reps" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"suspended" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"rating" text NOT NULL,
	"reviewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"elapsed_ms" integer
);
--> statement-breakpoint
ALTER TABLE "mistakes" ADD CONSTRAINT "mistakes_review_item_id_review_items_id_fk" FOREIGN KEY ("review_item_id") REFERENCES "public"."review_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_log" ADD CONSTRAINT "review_log_item_id_review_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."review_items"("id") ON DELETE no action ON UPDATE no action;