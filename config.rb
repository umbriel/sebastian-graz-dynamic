activate :directory_indexes

set :css_dir, "stylesheets"
set :js_dir, "javascripts"
set :images_dir, "images"
set :relative_links, false #should be true
set :haml, { ugly: true, format: :html5 }

page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false
page "/404.html", directory_index: false

# configure :development do
#   activate :pry
# end

helpers do
  def nav_active(path)
    current_page.path == path ? {:class => "active"} : {}
  end
end

configure :build do
  activate :minify_html do |html|
    html.remove_quotes = false
    html.remove_intertag_spaces = true
  # activate :relative_assets
end

  activate :external_pipeline,
    name: :gulp,
    command: "npm run production",
    source: ".tmp",
    latency: 1

  activate :asset_hash
  # activate :asset_host,
  #   host: "//cdn.cloudfront.net",
  #   rewrite_ignore: ["*.js"]

  # set :url_root, "http://example.com"

  # https://github.com/Aupajo/middleman-search_engine_sitemap
  # activate :search_engine_sitemap

  ignore "stylesheets/site"
end

activate :blog do |blog|
  blog.name = 'case'
  blog.prefix = 'case'
  blog.layout = 'case-layout'
  blog.permalink = ':title.html'
end

activate :blog do |blog|
  blog.name = 'verbose'
  blog.prefix = 'verbose'
  blog.layout = 'verbose-layout'
  blog.permalink = ':title.html'
end

activate :google_analytics do |ga|
  ga.tracking_id = 'UA-82393962-1' # Replace with your property ID.
  ga.debug = true
end


activate :syntax
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true, auto_ids: false

# https://github.com/fredjean/middleman-s3_sync
# activate :s3_sync do |s3|
#   s3.bucket = "your-bucket-name"
#   s3.aws_access_key_id = ENV["AWS_ACCESS_KEY_ID"]
#   s3.aws_secret_access_key = ENV["AWS_SECRET_ACCESS_KEY"]
#   s3.prefer_gzip = true
#   s3.index_document = "index.html"
#   s3.error_document = "404.html"
# end
