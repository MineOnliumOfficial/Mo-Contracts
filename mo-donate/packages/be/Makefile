run:
	@KO_DATA_PATH=cmd/be/kodata/ go run cmd/be/main.go

image:
	@gcloud builds submit --tag gcr.io/mineonlium/mo-donate .