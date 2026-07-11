---
layout: page
title: Tag Index
excerpt: "An archive of posts sorted by tag."
---

<div class="mt-10">
  {% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
  {% assign tags_list = site_tags | split:',' | sort %}

  <div class="flex flex-wrap gap-2">
    {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tags_list[item] | strip_newlines }}{% endcapture %}
    <a href="#{{ this_word }}" class="badge badge-brand no-underline">{{ this_word }} <span class="ml-1 text-content-muted">{{ site.tags[this_word].size }}</span></a>
    {% endunless %}{% endfor %}
  </div>

  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
  {% capture this_word %}{{ tags_list[item] | strip_newlines }}{% endcapture %}
  <h2 id="{{ this_word }}" class="mt-12">{{ this_word }}</h2>
  <ul class="space-y-2">
    {% for post in site.tags[this_word] %}
    {% if post.title != null %}
    {% if post.hidden != true %}
    <li class="flex items-center justify-between gap-4 rounded-lg border border-border p-3 dark:border-border">
      <a href="{{ site.url }}{{ post.url }}" class="no-underline font-medium">{{ post.title }}</a>
      <time datetime="{{ post.date | date_to_xmlschema }}" class="text-sm text-content-muted">{{ post.date | date: "%B %d, %Y" }}</time>
    </li>
    {% endif %}
    {% endif %}
    {% endfor %}
  </ul>
  {% endunless %}{% endfor %}
</div>