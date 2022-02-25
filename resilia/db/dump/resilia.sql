--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: sys; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA sys;


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: armor(bytea); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.armor(bytea) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_armor';


--
-- Name: armor(bytea, text[], text[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.armor(bytea, text[], text[]) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_armor';


--
-- Name: crypt(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.crypt(text, text) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_crypt';


--
-- Name: dearmor(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.dearmor(text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_dearmor';


--
-- Name: decrypt(bytea, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.decrypt(bytea, bytea, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_decrypt';


--
-- Name: decrypt_iv(bytea, bytea, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.decrypt_iv(bytea, bytea, bytea, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_decrypt_iv';


--
-- Name: digest(bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.digest(bytea, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_digest';


--
-- Name: digest(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.digest(text, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_digest';


--
-- Name: encrypt(bytea, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.encrypt(bytea, bytea, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_encrypt';


--
-- Name: encrypt_iv(bytea, bytea, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.encrypt_iv(bytea, bytea, bytea, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_encrypt_iv';


--
-- Name: gen_random_bytes(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.gen_random_bytes(integer) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pg_random_bytes';


--
-- Name: gen_random_uuid(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.gen_random_uuid() RETURNS uuid
    LANGUAGE c
    AS '$libdir/pgcrypto', 'pg_random_uuid';


--
-- Name: gen_salt(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.gen_salt(text) RETURNS text
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pg_gen_salt';


--
-- Name: gen_salt(text, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.gen_salt(text, integer) RETURNS text
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pg_gen_salt_rounds';


--
-- Name: hmac(bytea, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.hmac(bytea, bytea, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_hmac';


--
-- Name: hmac(text, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.hmac(text, text, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pg_hmac';


--
-- Name: pgp_armor_headers(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_armor_headers(text, OUT key text, OUT value text) RETURNS SETOF record
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_armor_headers';


--
-- Name: pgp_key_id(bytea); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_key_id(bytea) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_key_id_w';


--
-- Name: pgp_pub_decrypt(bytea, bytea); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_decrypt(bytea, bytea) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_decrypt_text';


--
-- Name: pgp_pub_decrypt(bytea, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_decrypt(bytea, bytea, text) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_decrypt_text';


--
-- Name: pgp_pub_decrypt(bytea, bytea, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_decrypt(bytea, bytea, text, text) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_decrypt_text';


--
-- Name: pgp_pub_decrypt_bytea(bytea, bytea); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_decrypt_bytea';


--
-- Name: pgp_pub_decrypt_bytea(bytea, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_decrypt_bytea';


--
-- Name: pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_decrypt_bytea(bytea, bytea, text, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_decrypt_bytea';


--
-- Name: pgp_pub_encrypt(text, bytea); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_encrypt(text, bytea) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_encrypt_text';


--
-- Name: pgp_pub_encrypt(text, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_encrypt(text, bytea, text) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_encrypt_text';


--
-- Name: pgp_pub_encrypt_bytea(bytea, bytea); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_encrypt_bytea(bytea, bytea) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_encrypt_bytea';


--
-- Name: pgp_pub_encrypt_bytea(bytea, bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_pub_encrypt_bytea(bytea, bytea, text) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pgp_pub_encrypt_bytea';


--
-- Name: pgp_sym_decrypt(bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_sym_decrypt(bytea, text) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_sym_decrypt_text';


--
-- Name: pgp_sym_decrypt(bytea, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_sym_decrypt(bytea, text, text) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_sym_decrypt_text';


--
-- Name: pgp_sym_decrypt_bytea(bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_sym_decrypt_bytea(bytea, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_sym_decrypt_bytea';


--
-- Name: pgp_sym_decrypt_bytea(bytea, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_sym_decrypt_bytea(bytea, text, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/pgcrypto', 'pgp_sym_decrypt_bytea';


--
-- Name: pgp_sym_encrypt(text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_sym_encrypt(text, text) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pgp_sym_encrypt_text';


--
-- Name: pgp_sym_encrypt(text, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_sym_encrypt(text, text, text) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pgp_sym_encrypt_text';


--
-- Name: pgp_sym_encrypt_bytea(bytea, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_sym_encrypt_bytea(bytea, text) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pgp_sym_encrypt_bytea';


--
-- Name: pgp_sym_encrypt_bytea(bytea, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.pgp_sym_encrypt_bytea(bytea, text, text) RETURNS bytea
    LANGUAGE c STRICT
    AS '$libdir/pgcrypto', 'pgp_sym_encrypt_bytea';


--
-- Name: rand(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.rand() RETURNS double precision
    LANGUAGE sql
    AS $$SELECT random();$$;


--
-- Name: substring_index(text, text, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.substring_index(text, text, integer) RETURNS text
    LANGUAGE sql
    AS $_$SELECT array_to_string((string_to_array($1, $2)) [1:$3], $2);$_$;


--
-- Name: update_modified_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_modified_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
    IF (NEW != OLD) THEN
        NEW.__uts = CURRENT_TIMESTAMP;
        RETURN NEW;
    END IF;
    RETURN OLD;
END;$$;


SET default_table_access_method = heap;

--
-- Name: cat_event_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cat_event_type (
    idr smallint NOT NULL,
    name character varying(100) NOT NULL,
    __cts timestamp(6) without time zone DEFAULT now() NOT NULL,
    __uts timestamp(6) without time zone DEFAULT now() NOT NULL,
    active boolean DEFAULT true NOT NULL
);


--
-- Name: cat_test_idr_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cat_test_idr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 32767
    CACHE 1;


--
-- Name: cat_test_idr_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cat_test_idr_seq OWNED BY public.cat_event_type.idr;


--
-- Name: cat_bool_null; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cat_bool_null (
    idr smallint DEFAULT nextval('public.cat_test_idr_seq'::regclass) NOT NULL,
    name character varying(100) NOT NULL,
    __cts timestamp(6) without time zone DEFAULT now() NOT NULL,
    __uts timestamp(6) without time zone DEFAULT now() NOT NULL,
    active boolean DEFAULT true NOT NULL
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    idr integer NOT NULL,
    content character varying NOT NULL,
    viewed boolean DEFAULT false NOT NULL,
    level character varying NOT NULL,
    type character varying
);


--
-- Name: notifications_idr_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notifications_idr_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_idr_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notifications_idr_seq OWNED BY public.notifications.idr;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    name text NOT NULL,
    id integer NOT NULL,
    comments text,
    idr uuid DEFAULT public.uuid_generate_v1mc() NOT NULL,
    event smallint NOT NULL,
    active smallint DEFAULT '1'::smallint NOT NULL
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: products_id_seq1; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys."user" (
    id integer NOT NULL,
    username text NOT NULL,
    email character varying(60) NOT NULL,
    password text NOT NULL,
    idr uuid DEFAULT public.uuid_generate_v1mc() NOT NULL,
    name character varying(50) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    __cts timestamp(6) without time zone DEFAULT now(),
    __uts timestamp(6) without time zone DEFAULT now()
);


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: sys; Owner: -
--

CREATE SEQUENCE sys."User_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: sys; Owner: -
--

ALTER SEQUENCE sys."User_id_seq" OWNED BY sys."user".id;


--
-- Name: conf; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.conf (
    idr smallint NOT NULL,
    core character varying(5000) NOT NULL,
    api character varying(5000) NOT NULL
);


--
-- Name: conf_idr_seq; Type: SEQUENCE; Schema: sys; Owner: -
--

CREATE SEQUENCE sys.conf_idr_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: conf_idr_seq; Type: SEQUENCE OWNED BY; Schema: sys; Owner: -
--

ALTER SEQUENCE sys.conf_idr_seq OWNED BY sys.conf.idr;


--
-- Name: fsm; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.fsm (
    idr uuid DEFAULT public.uuid_generate_v1mc() NOT NULL,
    owner uuid NOT NULL,
    "table" character varying(50) NOT NULL,
    path character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(100) NOT NULL,
    size bigint NOT NULL,
    __cts timestamp(6) without time zone DEFAULT now()
);


--
-- Name: fsm_tmp; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.fsm_tmp (
    idr uuid DEFAULT public.uuid_generate_v1mc() NOT NULL,
    sid uuid NOT NULL,
    sub_id character varying(50),
    path character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(100) NOT NULL,
    size bigint NOT NULL,
    __cts timestamp(6) without time zone DEFAULT now()
);


--
-- Name: group; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys."group" (
    idr smallint NOT NULL,
    name character varying(50) NOT NULL,
    editable boolean NOT NULL,
    visible boolean NOT NULL,
    protected boolean NOT NULL,
    active boolean NOT NULL,
    ngrant_all boolean NOT NULL,
    mgrant_all boolean NOT NULL,
    agrant_all boolean NOT NULL,
    ngrants character varying(500) NOT NULL,
    mgrants character varying(500) NOT NULL,
    agrants character varying(500) NOT NULL,
    __cts timestamp(6) without time zone DEFAULT now(),
    __uts timestamp(6) without time zone DEFAULT now()
);


--
-- Name: history; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.history (
    idr uuid DEFAULT public.uuid_generate_v1mc() NOT NULL,
    transaction boolean NOT NULL,
    query character varying(2000) NOT NULL,
    parameters character varying(2000) NOT NULL,
    rows character varying(50) NOT NULL,
    "user" uuid NOT NULL,
    __cts timestamp(6) without time zone DEFAULT now(),
    __uts timestamp(6) without time zone DEFAULT now()
);


--
-- Name: language; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.language (
    "ISO6391" character varying(5) NOT NULL,
    region character varying(5) NOT NULL,
    name character varying(20) NOT NULL,
    idr smallint NOT NULL
);


--
-- Name: language_idr_seq; Type: SEQUENCE; Schema: sys; Owner: -
--

CREATE SEQUENCE sys.language_idr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 32767
    CACHE 1;


--
-- Name: language_idr_seq; Type: SEQUENCE OWNED BY; Schema: sys; Owner: -
--

ALTER SEQUENCE sys.language_idr_seq OWNED BY sys.language.idr;


--
-- Name: mod_serial; Type: SEQUENCE; Schema: sys; Owner: -
--

CREATE SEQUENCE sys.mod_serial
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


--
-- Name: module; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.module (
    idr integer DEFAULT nextval('sys.mod_serial'::regclass) NOT NULL,
    mid character varying(16) NOT NULL,
    markup character varying(10000) NOT NULL,
    markup_parsed character varying(100),
    validations character varying(400),
    parameters character varying(2000),
    parameters_parsed character varying(200),
    mm_map character varying(2000),
    __uts timestamp(6) without time zone DEFAULT now(),
    parsed_ts timestamp(6) without time zone
);


--
-- Name: phrase; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.phrase (
    lang_id smallint NOT NULL,
    namespace character varying(10) NOT NULL,
    phrase character varying(50) NOT NULL,
    text character varying(255) NOT NULL,
    idr smallint NOT NULL,
    value character varying(4),
    "order" integer
);


--
-- Name: phrase_idr_seq; Type: SEQUENCE; Schema: sys; Owner: -
--

CREATE SEQUENCE sys.phrase_idr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 32767
    CACHE 1;


--
-- Name: phrase_idr_seq; Type: SEQUENCE OWNED BY; Schema: sys; Owner: -
--

ALTER SEQUENCE sys.phrase_idr_seq OWNED BY sys.phrase.idr;


--
-- Name: session; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.session (
    uid uuid NOT NULL,
    sid uuid NOT NULL,
    last_up timestamp(6) without time zone NOT NULL
);


--
-- Name: session_log; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.session_log (
    sid uuid NOT NULL,
    command character varying(50),
    po jsonb,
    ip character varying(39) NOT NULL,
    _cts timestamp without time zone DEFAULT '2021-05-20 17:43:55.009768'::timestamp without time zone NOT NULL,
    idr integer NOT NULL
);


--
-- Name: session_log_idr_seq; Type: SEQUENCE; Schema: sys; Owner: -
--

CREATE SEQUENCE sys.session_log_idr_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_log_idr_seq; Type: SEQUENCE OWNED BY; Schema: sys; Owner: -
--

ALTER SEQUENCE sys.session_log_idr_seq OWNED BY sys.session_log.idr;


--
-- Name: user_group; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.user_group (
    "user" uuid NOT NULL,
    "group" smallint NOT NULL
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: sys; Owner: -
--

ALTER TABLE sys."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME sys.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_session; Type: TABLE; Schema: sys; Owner: -
--

CREATE TABLE sys.user_session (
    idr bigint NOT NULL,
    uid integer NOT NULL,
    sid uuid NOT NULL,
    last_up timestamp without time zone NOT NULL
);


--
-- Name: user_session_idr_seq; Type: SEQUENCE; Schema: sys; Owner: -
--

CREATE SEQUENCE sys.user_session_idr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_session_idr_seq; Type: SEQUENCE OWNED BY; Schema: sys; Owner: -
--

ALTER SEQUENCE sys.user_session_idr_seq OWNED BY sys.user_session.idr;


--
-- Name: cat_event_type idr; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cat_event_type ALTER COLUMN idr SET DEFAULT nextval('public.cat_test_idr_seq'::regclass);


--
-- Name: notifications idr; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications ALTER COLUMN idr SET DEFAULT nextval('public.notifications_idr_seq'::regclass);


--
-- Name: conf idr; Type: DEFAULT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.conf ALTER COLUMN idr SET DEFAULT nextval('sys.conf_idr_seq'::regclass);


--
-- Name: language idr; Type: DEFAULT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.language ALTER COLUMN idr SET DEFAULT nextval('sys.language_idr_seq'::regclass);


--
-- Name: phrase idr; Type: DEFAULT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.phrase ALTER COLUMN idr SET DEFAULT nextval('sys.phrase_idr_seq'::regclass);


--
-- Name: session_log idr; Type: DEFAULT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.session_log ALTER COLUMN idr SET DEFAULT nextval('sys.session_log_idr_seq'::regclass);


--
-- Name: user_session idr; Type: DEFAULT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.user_session ALTER COLUMN idr SET DEFAULT nextval('sys.user_session_idr_seq'::regclass);


--
-- Name: cat_bool_null cat_po_status_copy1_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cat_bool_null
    ADD CONSTRAINT cat_po_status_copy1_pkey PRIMARY KEY (idr);


--
-- Name: cat_event_type cat_test_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cat_event_type
    ADD CONSTRAINT cat_test_pkey PRIMARY KEY (idr);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (idr);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (idr);


--
-- Name: user User_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys."user"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (idr);


--
-- Name: conf conf_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.conf
    ADD CONSTRAINT conf_pkey PRIMARY KEY (idr);


--
-- Name: fsm_tmp fsm_tmp_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.fsm_tmp
    ADD CONSTRAINT fsm_tmp_pkey PRIMARY KEY (idr);


--
-- Name: phrase keys; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.phrase
    ADD CONSTRAINT keys UNIQUE (lang_id, namespace, phrase);


--
-- Name: language language_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.language
    ADD CONSTRAINT language_pkey PRIMARY KEY (idr);


--
-- Name: phrase phrase_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.phrase
    ADD CONSTRAINT phrase_pkey PRIMARY KEY (idr);


--
-- Name: session_log session_log_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.session_log
    ADD CONSTRAINT session_log_pkey PRIMARY KEY (idr);


--
-- Name: group sys_group_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys."group"
    ADD CONSTRAINT sys_group_pkey PRIMARY KEY (idr);


--
-- Name: history sys_history_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.history
    ADD CONSTRAINT sys_history_pkey PRIMARY KEY (idr);


--
-- Name: user_group sys_user_group_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.user_group
    ADD CONSTRAINT sys_user_group_pkey PRIMARY KEY ("user", "group");


--
-- Name: user_session user_session_pkey; Type: CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.user_session
    ADD CONSTRAINT user_session_pkey PRIMARY KEY (idr);


--
-- Name: sessions_uid_sid_idx; Type: INDEX; Schema: sys; Owner: -
--

CREATE UNIQUE INDEX sessions_uid_sid_idx ON sys.session USING btree (uid, sid);


--
-- Name: cat_bool_null uts_cat; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER uts_cat BEFORE UPDATE ON public.cat_bool_null FOR EACH ROW EXECUTE FUNCTION public.update_modified_timestamp();


--
-- Name: cat_event_type uts_cat; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER uts_cat BEFORE UPDATE ON public.cat_event_type FOR EACH ROW EXECUTE FUNCTION public.update_modified_timestamp();


--
-- Name: group uts_cat; Type: TRIGGER; Schema: sys; Owner: -
--

CREATE TRIGGER uts_cat BEFORE UPDATE ON sys."group" FOR EACH ROW EXECUTE FUNCTION public.update_modified_timestamp();


--
-- Name: phrase phrase_lang_id_fkey; Type: FK CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.phrase
    ADD CONSTRAINT phrase_lang_id_fkey FOREIGN KEY (lang_id) REFERENCES sys.language(idr);


--
-- Name: user_group sys_user_group_group_fkey; Type: FK CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.user_group
    ADD CONSTRAINT sys_user_group_group_fkey FOREIGN KEY ("group") REFERENCES sys."group"(idr) ON DELETE CASCADE;


--
-- Name: user_group sys_user_group_user_fkey; Type: FK CONSTRAINT; Schema: sys; Owner: -
--

ALTER TABLE ONLY sys.user_group
    ADD CONSTRAINT sys_user_group_user_fkey FOREIGN KEY ("user") REFERENCES sys."user"(idr) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

